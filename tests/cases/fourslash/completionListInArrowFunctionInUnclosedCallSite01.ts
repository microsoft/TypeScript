/// <reference path='fourslash.ts' />

////declare function foo(...params: any[]): any;
////function getAllFiles(rootFileNames: string[]) {
////    var processedFiles = rootFileNames.map(fileName => foo(/*1*/

goTo.marker("1");
verify.not.completionListContains("fileName");
verify.not.completionListContains("rootFileNames");
verify.not.completionListContains("getAllFiles");
verify.not.completionListContains("foo");