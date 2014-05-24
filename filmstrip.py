import os
import sys

videos = [
	{
		"name": "speaker_name",
		#the paths can be whatever you want, but the containing
		#folders should already exist
		"original": "/path/to/original/video.mov",
		"frameSkipped": "videos/speaker_name_frameskipped.mov",
		"roid": "videos/speaker_name_roi.mov",
		"outputPath": "output/speaker_name",
		#top left of Region Of Interest
		"x1": 500,
		"y1": 0,
		#bottom right of Region Of Interest
		"x2": 1920,
		"y2": 1080,
		"excludeBefore": 20 #will not consider anything before 20 secodns as a keyframe
	}
]


def processAll(videos):
	for video in videos:
		os.system("python preprocess.py --command shrink --source {0} --dest {1}".format(video["original"], video["frameSkipped"]))

		os.system("python preprocess.py --command roi --source {0} --dest {1} --rect {2},{3},{4},{5}"
			.format(video["frameSkipped"], video["roid"], video["x1"], video["y1"], video["x2"], video["y2"]))

		os.system("python scene_detection.py -s {0} -d {1} -n {2} -a {3}"
			.format(video["roid"], video["outputPath"], video["name"], video["excludeBefore"]))

		sys.stdout.write('.')
		sys.stdout.flush()

processAll(videos)

#Make sure to set this to the output folder used in the video objects above
#(the folder) above the one for individual speakers.
outputPath = "output"
os.system("python postprocess.py -s {0} -d {0}".format(outputPath, outputPath))