#!/bin/bash

ls

nvm install $1

npm uninstall typescript
npm uninstall tslint
npm install
npm update
npm test
