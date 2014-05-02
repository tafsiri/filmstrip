import os
import json
import argparse

def concatMeta(path):
	files = getMeta(path)
	compositeMeta = []
	for fp in files:
		name = os.path.basename(fp).split("-")[0]
		meta = json.load(open(fp, 'r'))
		wrapped = {
			"name": name,
			"frames": meta
		}
		compositeMeta.append(wrapped)
	return compositeMeta

def getMeta(path):
	metafiles = []
	for root, dirs, files in os.walk(path):
		for f in files:
			if f.endswith("keyframe-meta.json"):
				fp = os.path.join(root, f)
				metafiles.append(fp)
	return metafiles

# Combines metadata files from multiple videos into
# one json file
def writeMeta(source, dest):
	composite = concatMeta(source)
	data_fp = os.path.join(dest, "metadata.json")
	with open(data_fp, 'w') as f:
	    data_json_str = json.dumps(composite, indent=4)
	    f.write(data_json_str)


parser = argparse.ArgumentParser()
parser.add_argument('-s','--source', help='source path', required=True)
parser.add_argument('-d', '--dest', help='dest path', required=True)
args = parser.parse_args()
print args.source
print args.dest
writeMeta(args.source, args.dest)
