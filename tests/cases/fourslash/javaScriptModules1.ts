///<reference path="fourslash.ts" />

// We can resolve modules declared in .d.ts files
// using the dependency array in 'define'

// @allowNonTsExtensions: true
// @Filename: node.d.ts
//// declare module "fs" {
//// 	export function readFile(path: string): string;
//// 	export function writeFile(path: string, content: string): number;
//// }

// @Filename: Foo.js
//// define('myMod', ['fs'], function(ff) {
////    let y = ff/**/;
//// });

goTo.marker();
edit.insert('.');
verify.completionListContains("readFile", /*displayText:*/ undefined, /*documentation*/ undefined, "function");

