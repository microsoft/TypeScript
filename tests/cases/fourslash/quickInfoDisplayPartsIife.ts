/// <reference path='fourslash.ts'/>
// @strictNullChecks: true
////var iife = (function foo/*1*/(x, y) { return x })(12);

verify.quickInfoAt('1', '(local function) foo(x: number, y?: undefined): number');
