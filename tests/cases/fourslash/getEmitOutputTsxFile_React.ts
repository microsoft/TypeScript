/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputTsxFile_React.baseline
// @declaration: true
// @sourceMap: true
// @jsx: react

// @Filename: inputFile1.ts
// @emitThisFile: true
////// regular ts file
//// var t: number = 5;
//// class Bar {
////    x : string;
////    y : number
//// }
//// /*1*/

// @Filename: inputFile2.tsx
// @emitThisFile: true
//// declare var React: any;
//// var y = "my div";
//// var x = <div name= {y} />
//// /*2*/

goTo.marker("1");
verify.numberOfErrorsInCurrentFile(0);
goTo.marker("2");
verify.numberOfErrorsInCurrentFile(0);

verify.baselineGetEmitOutput();