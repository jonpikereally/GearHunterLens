#!/usr/bin/env bash
# Builds updates/GearHunterLens.zip and writes updates/latest.json (last, so the
# feed never points at a half-written zip). Run by the release workflow.
set -euo pipefail
cd "$(dirname "$0")/.."
./scripts/check-errors.sh
version=$(python3 -c 'import json;print(json.load(open("manifest.json"))["version"])')
notes=$(cat RELEASE_NOTES.txt 2>/dev/null || true)
stage=$(mktemp -d)
mkdir "$stage/GearHunterLens"
cp -R manifest.json src app icons LICENSE README.md "$stage/GearHunterLens/"
mkdir -p updates
rm -f updates/GearHunterLens.zip
(cd "$stage" && zip -qr -X - GearHunterLens) > updates/GearHunterLens.zip
python3 - "$version" "$notes" > updates/latest.json <<'PY'
import json, sys
print(json.dumps({"version": sys.argv[1], "url": "GearHunterLens.zip", "notes": sys.argv[2].strip()}, indent=2))
PY
echo "Built GearHunterLens v$version"
