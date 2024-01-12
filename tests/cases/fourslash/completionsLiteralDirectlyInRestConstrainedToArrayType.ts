/// <reference path="fourslash.ts" />
// @strict: true
////
//// function fn<T extends ('value1' | 'value2' | 'value3')[]>(...values: T): T { return values; }
//// 
//// const value1 = fn('/*1*/');
//// const value2 = fn('value1', '/*2*/');

verify.completions({ marker: ["1", "2"], includes: [`value1`, `value2`, `value3`] })
