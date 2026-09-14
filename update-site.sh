#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: ./update-site.sh /path/to/extracted/new-version"
  exit 1
fi

SOURCE="$(cd "$1" && pwd)"
TARGET="$(cd "$(dirname "$0")" && pwd)"

if [ ! -d "$TARGET/.git" ]; then
  echo "This folder is not a Git repository yet: $TARGET"
  echo "Initialize/clone the repository first, then run this script from it."
  exit 1
fi

if [ -n "$(git -C "$TARGET" status --porcelain)" ]; then
  echo "Your repository has uncommitted changes. Commit or stash them before updating."
  git -C "$TARGET" status --short
  exit 1
fi

if [ "$SOURCE" = "$TARGET" ]; then
  echo "Source and target are the same folder. Nothing to update."
  exit 1
fi

echo "Updating website from: $SOURCE"
rsync -av --delete   --exclude='.git/'   --exclude='update-site.sh'   "$SOURCE"/ "$TARGET"/

echo
echo "Update copied. Review the changes before committing:"
git -C "$TARGET" status --short
echo
echo "Useful next commands:"
echo "  git diff"
echo "  git add -A"
echo "  git commit -m 'Update website'"
echo "  git push"
