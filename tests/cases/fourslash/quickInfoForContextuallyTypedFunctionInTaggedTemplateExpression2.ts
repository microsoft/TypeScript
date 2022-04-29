/// <reference path="fourslash.ts" />

////function tempTag2(templateStrs: TemplateStringsArray, f: (x: number) => number, x: number): number;
////function tempTag2(templateStrs: TemplateStringsArray, f: (x: string) => string, h: (y: string) => string, x: string): string;
////function tempTag2(...rest: any[]): any {
////    return undefined;
////}
////
////tempTag2 `${ x => /*0*/x }${ 0 }`;
////tempTag2 `${ /*1*/x => /*2*/x }${ undefined }`;
////tempTag2 `${ x => /*3*/x }${ x => /*4*/x }${ "hello" }`;
////tempTag2 `${ x => /*5*/x }${ undefined }${ "hello" }`;

// The first group of parameters, [0, 2], should all be contextually typed as 'number'.
// The second group, [3, 5], should be typed as 'string'.
var numTypedVariableCount = 3;
var strTypedVariableCount = 3;

if (numTypedVariableCount + strTypedVariableCount !== test.markers().length) {
    throw "Unexpected number of markers in file.";
}

for (var i = 0; i < numTypedVariableCount; i++) {
    verify.quickInfoAt("" + i, "(parameter) x: number");
}

for (var i = 0; i < strTypedVariableCount; i++) {
    verify.quickInfoAt("" + (i + numTypedVariableCount), "(parameter) x: string");
}