/// <reference path='fourslash.ts'/>

//@Filename: AA/BB.ts
////export class a{}

//@Filename: quickInfoForRequire_input.ts
////import a = require("./AA/B/*1*/B");
////import b = require(`./AA/B/*2*/B`);


goTo.marker("1");
verify.quickInfoIs("module a");

goTo.marker("2");
verify.quickInfoIs("module a");
