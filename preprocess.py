import math
import cv2
import cv
import argparse

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

#
# Extracts one frame every second
#
def extractFrames(sourcePath, destPath, verbose=False):
    info = getInfo(sourcePath)    

    cap = cv2.VideoCapture(sourcePath)
    fourcc = cv2.cv.CV_FOURCC('X','V','I','D')
    out = cv2.VideoWriter(destPath, 
        fourcc, 
        info["fps"],
        (info["width"], info["height"]))    

    ret = True
    while(cap.isOpened() and ret):
        ret, frame = cap.read()
        frame_number = cap.get(cv.CV_CAP_PROP_POS_FRAMES) - 1
        if frame_number % math.ceil(info["fps"]) == 0:
            out.write(frame)

            if verbose:
                cv2.imshow('frame', frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            
    cap.release()
    out.release()
    cv2.destroyAllWindows()


parser = argparse.ArgumentParser(description='Extract one frame from every second of video')

parser.add_argument('--source', help='source file', required=True)
parser.add_argument('--dest', help='source file', required=True)
parser.add_argument('--verbose', action='store_true')
parser.set_defaults(verbose=False)

args = parser.parse_args()

if args.verbose:
    info = getInfo(args.source)
    print("Source Info: ", info)

extractFrames(args.source, args.dest, args.verbose)
