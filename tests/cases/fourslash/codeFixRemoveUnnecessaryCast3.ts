/// <reference path="fourslash.ts" />
// @checkJs: true
// @Filename: /types.d.ts
////interface Foo {
////  x?: string;
////}
////declare class A {
////  item: any;
////}
////declare class B {
////  item: any;
////}
// @Filename: /file.js
////const a = {};
/////**
//// * @type {{}}
//// */
////let b;
////b = /** @type {{}} */(a);
/////**
//// * @type {Foo}
//// */
////const foo1 = /** @type {Foo} */({x: "ok"}); // cast technically erases type information, not a no-op
/////**
//// * @type {Foo}
//// */
////const foo2 = /** @type {Foo} */(foo1);
////const aCls = new A();
////const bCls = new B();
/////**
//// * @type {A}
//// */
////const aCls2 = /** @type {A} */(bCls);
/////**
//// * @type {B}
//// */
////const bCls2 = /** @type {A} */(aCls);
////const fn = () => /** @type {{}} */({});

goTo.file(1);
verify.codeFix({
  description: ts.Diagnostics.Remove_unnecessary_type_cast.message,
  index: 2,
  newFileContent:
`const a = {};
/**
 * @type {{}}
 */
let b;
b = a;
/**
 * @type {Foo}
 */
const foo1 = /** @type {Foo} */({x: "ok"}); // cast technically erases type information, not a no-op
/**
 * @type {Foo}
 */
const foo2 = /** @type {Foo} */(foo1);
const aCls = new A();
const bCls = new B();
/**
 * @type {A}
 */
const aCls2 = /** @type {A} */(bCls);
/**
 * @type {B}
 */
const bCls2 = /** @type {A} */(aCls);
const fn = () => /** @type {{}} */({});`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Remove_all_unnecessary_type_casts.message,
  fixId: "removeUnnecessaryCast",
  newFileContent:
`const a = {};
/**
 * @type {{}}
 */
let b;
b = a;
/**
 * @type {Foo}
 */
const foo1 = /** @type {Foo} */({x: "ok"}); // cast technically erases type information, not a no-op
/**
 * @type {Foo}
 */
const foo2 = foo1;
const aCls = new A();
const bCls = new B();
/**
 * @type {A}
 */
const aCls2 = bCls;
/**
 * @type {B}
 */
const bCls2 = aCls;
const fn = () => /** @type {{}} */({});`
});
