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
    npm uninstall typemock @typescript/vfs-om @typescript/vfs @typescript/vfs-path @typescript/vfs-core @typescript/vfs-errors --no-save;
    npm run build:private-packages;
    npm install file:scripts/typemock file:scripts/vfs-om file:scripts/vfs file:scripts/vfs-path --no-save;
fi

npm update
npm test
