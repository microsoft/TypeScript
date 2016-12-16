/// <reference path='fourslash.ts'/>

//@Filename: AA/BB.ts
////export class a{}

//@Filename: quickInfoForRequire_input.ts
////import a = require("./AA/B/*1*/B");

verify.quickInfoAt("1", "module a");
verify.referencesAre([]);