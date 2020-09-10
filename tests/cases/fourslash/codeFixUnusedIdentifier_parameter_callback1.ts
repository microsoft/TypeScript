/// <reference path='fourslash.ts' />

// @noUnusedParameters: true

////declare function f(cb: (x: number, y: string) => void): void;
////f((x, y) => { y; });

// No codefix to remove a non-last parameter in a callback
verify.codeFixAvailable([{ description: "Prefix 'x' with an underscore" }]);
