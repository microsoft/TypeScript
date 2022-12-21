/// <reference path='fourslash.ts' />

// @noUnusedParameters: true

////declare function foo(cb: (x: number, y: string) => void): void;
////function fn(x: number, y: number): any {
////    return y;
////}
////foo(fn);

// No codefix to remove a non-last parameter in a callback
verify.codeFixAvailable([{ description: "Prefix 'x' with an underscore" }]);
