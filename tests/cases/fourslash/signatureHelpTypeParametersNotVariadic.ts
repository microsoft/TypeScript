/// <reference path="fourslash.ts" />

//// declare function f(a: any, ...b: any[]): any;
//// f</*1*/>(1, 2);

verify.signatureHelp({ marker: "1", argumentCount: 0, isVariadic: false });
