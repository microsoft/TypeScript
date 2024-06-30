/// <reference path="fourslash.ts" />

////function f(a: string): string;
////function f(a: string, b: number): string;
////function f(a: string, b?: number): string {
////    return "";
////}
////f("", "", 1);

verify.not.codeFixAvailable("addOptionalParam");
