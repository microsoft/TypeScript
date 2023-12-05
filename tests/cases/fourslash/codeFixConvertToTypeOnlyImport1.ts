/// <reference path="fourslash.ts" />

// @importsNotUsedAsValues: error

// @Filename: exports.ts
////export default class A {}
////export class B {}
////export class C {}

// @Filename: imports.ts
////import {
////    B,
////    C,
////} from './exports';
////
////declare const b: B;
////declare const c: C;
////console.log(b, c);

goTo.file("imports.ts");
verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Use_import_type.message,
    newFileContent: `import type {
    B,
    C,
} from './exports';

declare const b: B;
declare const c: C;
console.log(b, c);`
});
