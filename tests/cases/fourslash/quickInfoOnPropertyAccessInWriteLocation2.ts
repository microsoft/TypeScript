/// <reference path='fourslash.ts'/>

// @strict: true
// @exactOptionalPropertyTypes: true
//// declare const xx: { prop?: number };
//// xx.prop/*1*/ += 1;

verify.quickInfoAt('1', '(property) prop?: number');
