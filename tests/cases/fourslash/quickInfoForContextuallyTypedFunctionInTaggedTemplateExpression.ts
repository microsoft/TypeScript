/// <reference path="fourslash.ts" />

////function tempTag1<T>(templateStrs: TemplateStringsArray, f: (x: T) => T, x: T): T;
////function tempTag1<T>(templateStrs: TemplateStringsArray, f: (x: T) => T, h: (y: T) => T, x: T): T;
////function tempTag1<T>(...rest: any[]): T {
////    return undefined;
////}
////
////tempTag1 `${ x => /*0*/x }${ 10 }`;
////tempTag1 `${ x => /*1*/x }${ x => /*2*/x }${ 10 }`;
////tempTag1 `${ x => /*3*/x }${ (x: number) => /*4*/x }${ undefined }`;
////tempTag1 `${ (x: number) => /*5*/x }${ x => /*6*/x }${ undefined }`;
////
////function tempTag2(templateStrs: TemplateStringsArray, f: (x: number) => number, x: number): number;
////function tempTag2(templateStrs: TemplateStringsArray, f: (x: string) => string, h: (y: string) => string, x: string): string;
////function tempTag2(...rest: any[]): any {
////    return undefined;
////}
////
////tempTag2 `${ x => /*7*/x }${ 0 }`;
////tempTag2 `${ x => /*8*/x }${ undefined }`;
////tempTag2 `${ x => /*9*/x }${ x => /*10*/x }${ "hello" }`;
////tempTag2 `${ x => /*11*/x }${ undefined }${ "hello" }`;

// The first group of parameters, [0, 8], should all be contextually typed as 'number'.
// The second group, [9, 11], should be typed as 'string'.
var numTypedVariableCount = 9;
var strTypedVariableCount = 3;

var markers = test.markers();

if (numTypedVariableCount + strTypedVariableCount !== markers.length) {
    throw "Unexpected number of markers in file.";
}

for (var i = 0; i < numTypedVariableCount; i++) {
    goTo.marker("" + i);
    verify.quickInfoIs("(parameter) x: number");
}

for (var i = 0; i < strTypedVariableCount; i++) {
    goTo.marker("" + (i + numTypedVariableCount));
    verify.quickInfoIs("(parameter) x: string");
}