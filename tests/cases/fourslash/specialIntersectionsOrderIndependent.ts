/// <reference path="fourslash.ts" />
//
//// declare function a(arg: 'test' | (string & {})): void
//// a('/*1*/')
//// declare function b(arg: 'test' | ({} & string)): void
//// b('/*2*/')

verify.completions({ marker: ["1", "2"], exact: ["test"] });
