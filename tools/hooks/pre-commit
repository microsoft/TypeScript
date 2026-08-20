#!/bin/sh
if git diff --name-only --cached --relative | xargs --no-run-if-empty ./node_modules/.bin/dprint fmt; then
    git diff --name-only --cached --relative | xargs --no-run-if-empty git add
fi
