/// <reference path="fourslash.ts" />
// @strict: true
////
//// declare function func<
////   const T extends 'a' | 'b' | undefined = undefined,
//// >(arg?: T): string;
////
//// func('/*1*/');

verify.completions({ marker: ["1"], exact: [`a`, `b`] });
