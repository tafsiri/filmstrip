import math
import cv2
import cv
import argparse
import json
import os
import numpy as np
import errno
import sys

def getInfo(sourcePath):
    cap = cv2.VideoCapture(sourcePath)
    info = {
        "framecount": cap.get(cv.CV_CAP_PROP_FRAME_COUNT),
        "fps": cap.get(cv.CV_CAP_PROP_FPS),
        "width": int(cap.get(cv.CV_CAP_PROP_FRAME_WIDTH)),
        "height": int(cap.get(cv.CV_CAP_PROP_FRAME_HEIGHT)),
        "codec": int(cap.get(cv.CV_CAP_PROP_FOURCC))
    }
    cap.release()
    return info


def scale(img, xScale, yScale):
    res = cv2.resize(img, None,fx=xScale, fy=yScale, interpolation = cv2.INTER_AREA)
    return res

def resize(img, width, height):
    res = cv2.resize(img, (width, height), interpolation = cv2.INTER_AREA)
    return res

#
# Extract [numCols] domninant colors from an image
# Uses KMeans on the pixels and then returns the centriods
# of the colors
#
def extract_cols(image, numCols):
    # convert to np.float32 matrix that can be clustered
    Z = image.reshape((-1,3))
    Z = np.float32(Z)

    # Set parameters for the clustering
    max_iter = 20
    epsilon = 1.0
    K = numCols
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, max_iter, epsilon)

    # cluster
    compactness, labels, centers = cv2.kmeans(Z, K, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

    clusterCounts = []
    for idx in range(K):
        count = len(Z[labels == idx])
        clusterCounts.append(count)

    #Reverse the cols stored in centers because cols are stored in BGR
    #in opencv.
    rgbCenters = []
    for center in centers:
        bgr = center.tolist()
        bgr.reverse()
        rgbCenters.append(bgr)

    cols = []
    for i in range(K):
        iCol = {
            "count": clusterCounts[i],
            "col": rgbCenters[i]
        }
        cols.append(iCol)

    return cols


#
# Extracts one frame every second
#
def detectKeyframes(sourcePath, verbose=False):
    info = getInfo(sourcePath)

    cap = cv2.VideoCapture(sourcePath)
    #fgbg = cv2.BackgroundSubtractorMOG()

    data = {
        "frame_info": []
    }

    lastFrame = None
    while(cap.isOpened()):
        ret, frame = cap.read()
        if frame == None:
            break

        frame_number = cap.get(cv.CV_CAP_PROP_POS_FRAMES) - 1

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)


        if lastFrame != None: # and frame_number - 5 < info["framecount"]:
            # fgmask = fgbg.apply(frame)

            diff = cv2.subtract(gray, lastFrame)

            diffMag = cv2.countNonZero(diff)

            frame_info = {
                "frame_number": int(frame_number),
                "diff_count": int(diffMag)
            }
            data["frame_info"].append(frame_info)



            # print("Non-zero px: ", diffMag)

            if verbose:
                # cv2.imshow('fgmask', fgmask)
                cv2.imshow('diff', diff)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

        lastFrame = gray

    cap.release()
    # out.release()
    cv2.destroyAllWindows()

    #compute some states
    diff_counts = [fi["diff_count"] for fi in data["frame_info"]]
    data["stats"] = {
        "num": len(diff_counts),
        "min": np.min(diff_counts),
        "max": np.max(diff_counts),
        "mean": np.mean(diff_counts),
        "median": np.median(diff_counts),
        "sd": np.std(diff_counts)
    }
    greater_than_mean = [fi for fi in data["frame_info"] if fi["diff_count"] > data["stats"]["mean"]]
    greater_than_median = [fi for fi in data["frame_info"] if fi["diff_count"] > data["stats"]["median"]]
    greater_than_one_sd = [fi for fi in data["frame_info"] if fi["diff_count"] > data["stats"]["sd"] + data["stats"]["mean"]]
    greater_than_two_sd = [fi for fi in data["frame_info"] if fi["diff_count"] > (data["stats"]["sd"] * 2) + data["stats"]["mean"]]
    greater_than_three_sd = [fi for fi in data["frame_info"] if fi["diff_count"] > (data["stats"]["sd"] * 3) + data["stats"]["mean"]]

    data["stats"]["greater_than_mean"] = len(greater_than_mean)
    data["stats"]["greater_than_median"] = len(greater_than_median)
    data["stats"]["greater_than_one_sd"] = len(greater_than_one_sd)
    data["stats"]["greater_than_three_sd"] = len(greater_than_three_sd)
    data["stats"]["greater_than_two_sd"] = len(greater_than_two_sd)

    return data

#
# Extracts one frame every second
#
def extractKeyframes(sourcePath, destPath, data, name, verbose=False):
    info = getInfo(sourcePath)
    destDir = os.path.join(destPath, "images", "full")
    destDirSmall = os.path.join(destPath, "images", "100x100")

    diff_threshold = (data["stats"]["sd"] * 2) + data["stats"]["mean"]
    print("diff_threshold", diff_threshold)

    cap = cv2.VideoCapture(sourcePath)
    writeCount = 0
    for index, fi in enumerate(data["frame_info"]):
        if fi["diff_count"] < diff_threshold:
            continue

        cap.set(cv.CV_CAP_PROP_POS_FRAMES, fi["frame_number"])
        ret, frame = cap.read()

         #extract dominant color
        small = resize(frame, 100, 100)
        cols = extract_cols(small, 5)
        data["frame_info"][index]["dominant_cols"] = cols


        if frame != None:
            # + "---" + str(writeCount)
            fname = os.path.join(destDir, name + "-" + str(index+1) + ".png")
            cv2.imwrite(fname, frame)
            writeCount += 1

            if verbose:
                cv2.imshow('extract', frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

    cap.release()
    cv2.destroyAllWindows()
    return data


def make_output_dirs(path):
    try:
        os.makedirs(os.path.join(path, "metadata"))
        os.makedirs(os.path.join(path, "images", "full"))
        os.makedirs(os.path.join(path, "images", "100x100"))
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else: raise


parser = argparse.ArgumentParser(description='Extract one frame from every second of video')

parser.add_argument('-s','--source', help='source file', required=True)
parser.add_argument('-d', '--dest', help='dest folder', required=True)
parser.add_argument('-n', '--name', help='image sequence name', required=True)
parser.add_argument('-v', '--verbose', action='store_true')
parser.set_defaults(verbose=False)

args = parser.parse_args()

if args.verbose:
    info = getInfo(args.source)
    print("Source Info: ", info)

make_output_dirs(args.dest)

data = detectKeyframes(args.source, args.verbose)
data = extractKeyframes(args.source, args.dest, data, args.name, args.verbose)
keyframeInfo = [frame_info for frame_info in data["frame_info"] if "dominant_cols" in frame_info]

data_fp = os.path.join(args.dest, "metadata", args.name + "-meta.json")
with open(data_fp, 'w') as f:
    data_json_str = json.dumps(data, indent=4)
    f.write(data_json_str)

keyframe_info_fp = os.path.join(args.dest, "metadata", args.name + "-keyframe-meta.json")
with open(keyframe_info_fp, 'w') as f:
    data_json_str = json.dumps(keyframeInfo, indent=4)
    f.write(data_json_str)
