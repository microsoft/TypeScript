/// <reference path='fourslash.ts' />

////declare function foo(...params: any[]): any;
////function getAllFiles(rootFileNames: string[]) {
////    var processedFiles = rootFileNames.map(fileName => foo(/*1*/

verify.completions({
    marker: "1",
    includes: ["fileName", "rootFileNames", "getAllFiles", "foo"],
    isNewIdentifierLocation: true,
});
