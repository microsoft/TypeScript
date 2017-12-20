#!/usr/bin/env bash

# Set up NVM
export NVM_DIR="/home/dotnet-bot/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm install $1

npm uninstall typescript --no-save
npm uninstall tslint --no-save
npm install

# Node 6 uses an older version of npm that does not symlink a package with a "file:" reference
if [ "$1" = "6" ]; then
    npm uninstall typemock --no-save;
    npm run build:typemock;
    npm install file:scripts/typemock --no-save;
fi

npm update
npm test
