/// <reference path='fourslash.ts'/>

//@Filename: AA/BB.ts
////export class a{}

//@Filename: quickInfoForRequire_input.ts
////import a = require("./AA/B/*1*/B");

goTo.marker("1");
verify.quickInfoIs("module a");
verify.noReferences();
