/// <reference path="fourslash.ts" />

// @importsNotUsedAsValues: error

// @Filename: exports.ts
////export default class A {}
////export class B {}
////export class C {}

// @Filename: imports.ts
////import A, { B, C } from './exports';
////
////declare const a: A;
////declare const b: B;
////declare const c: C;
////console.log(a, b, c);

goTo.file("imports.ts");
verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Use_import_type.message,
    newFileContent: `import type A from './exports';
import type { B, C } from './exports';

declare const a: A;
declare const b: B;
declare const c: C;
console.log(a, b, c);`
});
