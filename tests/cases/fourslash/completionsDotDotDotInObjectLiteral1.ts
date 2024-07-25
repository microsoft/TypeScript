/// <reference path="fourslash.ts" />

//// // https://github.com/microsoft/TypeScript/issues/57540
////
//// const foo = { b: 100 };
////
//// const bar: {
////   a: number;
////   b: number;
//// } = {
////   a: 42,
////   .../*1*/
//// };

verify.completions({ marker: "1", includes: ["foo"], excludes: ["b"] });
