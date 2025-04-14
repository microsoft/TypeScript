/// <reference path="fourslash.ts" />
// @strict: true
////
//// interface Func {
////   <Key extends "a" | "b">(
////     ...args:
////       | [key: Key, options?: any]
////       | [key: Key, defaultValue: string, options?: any]
////   ): string;
//// }
////
//// declare const func: Func;
////
//// func("/*1*/");

verify.completions({ marker: ["1"], exact: [`a`, `b`] });
