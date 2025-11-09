/// <reference path='fourslash.ts' />

// @strict: true
//// // based on https://github.com/microsoft/TypeScript/issues/55495
//// type X =
////   | {
////       name: string;
////       [key: string]: any;
////     }
////   | {
////       name: "john";
////       someProp: boolean;
////     };
////
//// const obj = { name: "john", /*1*/someProp: "foo" } satisfies X;

verify.quickInfoAt("1", "(property) someProp: string");
