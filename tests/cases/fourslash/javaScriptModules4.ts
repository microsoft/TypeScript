///<reference path="fourslash.ts" />

// When a module name is 'require', it acts as a function that
// can produce a module as if it were imported

// @allowNonTsExtensions: true
// @Filename: node.d.ts
//// declare module "fs" {
//// 	export function readFile(path: string): string;
//// 	export function writeFile(path: string, content: string): number;
//// }

// @Filename: Foo.js
//// define('myMod', ['require'], function(r) {
////    let ff = r('fs');
////    let y = ff/**/;
//// }

goTo.marker();
edit.insert('.');
verify.completionListContains("readFile", /*displayText:*/ undefined, /*documentation*/ undefined, "function");
