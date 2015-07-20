///<reference path="fourslash.ts" />

// We can resolve modules declared in .d.ts file
// using the dependency array in 'define'

// @allowNonTsExtensions: true
// @Filename: node.d.ts
//// declare module "fs" {
//// 	export function readFile(path: string): string;
//// 	export function writeFile(path: string, content: string): number;
//// }

// @Filename: Foo.js
//// define('myMod', ['fs'], function(ff) {
////    let y = ff/*2*/;
//// });

goTo.marker('2');
edit.insert('.');
verify.completionListContains("readFile", /*displayText:*/ undefined, /*documentation*/ undefined, "function");

