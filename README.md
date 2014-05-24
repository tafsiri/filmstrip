# Filmstrip.py

## Description

Filmstrip is an OpenCV/Python based set of scripts for extracting keyframes from video. It was written to extract the data that powers the <a href="http://openvisconf.com#videos" target="_blank">openvisconf videos</a> visualization.

It comprises scripts that perform the following functions

__Frame skipping__: Reducing the number of frames in the video by extracting one frame per second.

__Region of Interest (ROI) extraction__: Allows you to sepcify a rectangular ROI to extract from a video. Crops the video.

__Scene Detection/Keyframe Selection__: Outputs a set of frames that represent transition points in the video. Will output the frames as well as a metadata file with data collected during the process. This data will include dominant colors in the images for the keyframes.

__Postprocessing__: A script to combine the metadata files from multiple videos into one.

## Status

Useful but probably a little rough around the edges. I'll be hacking on this as I get time and have ideas.

## Setup

Requires a working python installing with the opencv package / python binding installed. Refer to [here](http://opencv.org/) for instructions on how to get opencv up and running on your system.

## Usage

There are 4 main scripts. preprocess.py, contains the frame-skipping and ROI extraction. scene_detection.py contains the scene detection stuff and postprocessing.py and lastly filmstrip.py. Most print usage information when you try and run them but here are some examples

__Frame Skip__

```
python preprocess.py --command shrink --source /path/to/input/file --dest /path/to/output/file
```

__ROI Extraction__. x1,y1 is the top left corner coordinate of the rectangle. x2,y2 is the bottom right corner coordinate of the rectangle.

Note that this step is not necessary if you do not want to crop out any part of the video.

```
python preprocess.py --command roi --source /path/to/input/file --dest /path/to/output/file --rect x1,y1,x2,y2
```

__Scene Detection__

```
python scene_detection.py -s --source /path/to/input/file -d /path/to/output/folder -n identifierName -a excludeFramesBeforeThisIndex"
```

-n idenitifierName: This is a name useful to identify this video. It will be written into the metadata file for later cross referencing. Also a subfolder with this name will be generated in dest folder and that is where the data will go. Generated images will use this name as a prefix.

-a excludeBefore: An optional parameter. If you want to skip a certain number of frames at the beginning of the video from being considered, put the frame number here. In a video that has been frameskipped this will be equal to the seconds on the clock for when you want to start extracting frames.

This will generate an output folder with subfolders that contain images at various scales. The frame number is appended to the image name.

__Postprocessing__

```
python postprocess.py -s path/to/source/folder -d path/to/dest/folder
```

Will recursively look into source folder for metadata-keyframe.json files generated in the previous step. Will then concatenate them into one metadata.json file that will be placed in the output folder. Run this after processing all your videos.


__filmstrip.py: the helper script__

There is also a helper script __filmstrip.py__ that you can use for convenience, to process a bunch of files, though is definitely not required.

Open it up and then edit the ```videos``` array to contain data about your videos. You can then run the script to batch process them. It simply calls the other scripts in order.

I often rerun the scene detection step. So once the first two are done, i just comment out those lines and can batch run the step I want repeatedly.

