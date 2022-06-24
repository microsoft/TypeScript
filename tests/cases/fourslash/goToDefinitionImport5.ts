/// <reference path='fourslash.ts' />

// @allowJs: true
// @filename: /foo.js
////import fs from "fs";
////module.exports./*2*/foo = 0;

// @Filename: /index.js
////const { [|/*1*/foo|] } = require("./foo");

goTo.file("/index.js");
verify.goToDefinition("1", ["2"]);
