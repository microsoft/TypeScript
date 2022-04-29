/// <reference path='fourslash.ts' />
// @Filename: app.ts
////export import A = require('./app2');
////export var I = 1;
////A./*1*/Y;
////A.B.A.B./*2*/I;

// @Filename: app2.ts
////export import B = require('./app');
////export var Y = 1;

verify.quickInfos({
    1: "var A.Y: number",
    2: "var I: number"
});
