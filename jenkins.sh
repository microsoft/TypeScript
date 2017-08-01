#!/usr/bin/env bash

# Set up NVM
export NVM_DIR="/home/dotnet-bot/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm install $1

npm uninstall typescript --no-save
npm uninstall tslint --no-save
npm install
npm update
npm test
