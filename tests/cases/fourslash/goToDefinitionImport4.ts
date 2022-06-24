/// <reference path='fourslash.ts' />

// @allowJs: true
// @filename: /foo.js
////import fs from "fs";
////function foo() {}
////module.exports = {
////  /*2*/foo,
////}

// @Filename: /index.js
////const { [|/*1*/foo|] } = require("./foo");

goTo.file("/index.js");
verify.goToDefinition("1", ["2"]);
