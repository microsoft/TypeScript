#!/usr/bin/env node

var pack = require('../')();
process.stdin.pipe(pack).pipe(process.stdout);
