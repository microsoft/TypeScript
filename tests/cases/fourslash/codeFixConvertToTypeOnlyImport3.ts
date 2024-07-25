/// <reference path="fourslash.ts" />

// @module: esnext
// @verbatimModuleSyntax: true

// @Filename: exports1.ts
////export default class A {}
////export class B {}
////export class C {}

// @Filename: exports2.ts
////export default class D {}
////export class E {}
////export class F {}

// @Filename: imports.ts
////import A, { B, C } from './exports1';
////import D, * as others from "./exports2";
////
////declare const a: A;
////declare const b: B;
////declare const c: C;
////declare const d: D;
////declare const o: typeof others;
////console.log(a, b, c, d, o);

goTo.file("imports.ts");
// This test previously showed that a codefix could be applied to turn
// these imports, only used in type positions, into type-only imports.
// The code fix was triggered by the error issued by
// `--importsNotUsedAsValues error`, for which there is no analog in
// the compiler after its removal. `verbatimModuleSyntax` does not
// error here since the imported names are values, and so will not
// crash at runtime. Users have replaced this error and codefix with
// an eslint rule. We could consider bringing it back as a suggestion
// diagnostic, a refactor, or an organizeImports feature.
verify.not.codeFixAvailable();
