/// <reference path="fourslash.ts" />

// @importsNotUsedAsValues: error

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
verify.codeFixAll({
  fixId: "convertToTypeOnlyImport",
  fixAllDescription: ts.Diagnostics.Convert_all_imports_not_used_as_a_value_to_type_only_imports.message,
  newFileContent: `import type A from './exports1';
import type { B, C } from './exports1';
import type D from "./exports2";
import type * as others from "./exports2";

declare const a: A;
declare const b: B;
declare const c: C;
declare const d: D;
declare const o: typeof others;
console.log(a, b, c, d, o);`
});
