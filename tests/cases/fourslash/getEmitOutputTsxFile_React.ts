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

// @Filename: inputFile2.tsx
// @emitThisFile: true
//// var y = "my div";
//// var x = <div name= {y} />

verify.baselineGetEmitOutput();