/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import n = require('unknown/*1*/');

goTo.marker('1');
verify.not.definitionLocationExists();