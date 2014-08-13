/// <reference path='fourslash.ts' />
// @Filename: app.ts
////export import A = require('app2');
////export var I = 1;
////A.Y/*1*/;
////A.B.A.B.I/*2*/;

// @Filename: app2.ts
////export import B = require('app');
////export var Y = 1;

goTo.marker("1");
verify.quickInfoIs("number", undefined, "A.Y");

goTo.marker("2");
verify.quickInfoIs("number", undefined "A.B.I");
