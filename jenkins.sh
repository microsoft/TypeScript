#!/usr/bin/env bash
if [ "$1" = "6" ]; then
    echo "NodeJS v6 is no longer supported, build skipped.";
    exit;
fi;

# Set up NVM
export NVM_DIR="/home/dotnet-bot/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"


nvm install $1

npm uninstall typescript --no-save
npm uninstall tslint --no-save
npm install
npm update
npm test
