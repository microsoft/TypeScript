/// <reference path='fourslash.ts' />

////declare function foo(...params: any[]): any;
////function getAllFiles(rootFileNames: string[]) {
////    var processedFiles = rootFileNames.map(fileName => foo(/*1*/

goTo.marker("1");
verify.completionListContains("fileName");
verify.completionListContains("rootFileNames");
verify.completionListContains("getAllFiles");
verify.completionListContains("foo");