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

for (const marker of test.markerNames()) {
    verify.quickInfoAt(marker, "(parameter) x: number");
}
