/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/55251

//// interface P {}
//// interface B extends P {
////   [k: string]: number;
//// }
//// declare const b: B;
//// b.t/*1*/est = 10;

verify.quickInfoAt("1", "(index) B[string]: number");
