/// <reference path="fourslash.ts" />
////const a = {};
////let b: {};
////b = a as {};
////interface Foo {
////  x?: string;
////}
////const foo1: Foo = {x: "ok"} as Foo; // cast technically erases type information, not a no-op
////const foo2: Foo = foo1 as Foo;
////class A {
////  item: any;
////}
////class B {
////  item: any;
////}
////const aCls = new A();
////const bCls = new B();
////const aCls2: A = bCls as A;
////const bCls2: B = aCls as A;
////const tup = [0] as [0]; // required to preserve literalness

verify.codeFix({
  description: ts.Diagnostics.Remove_unnecessary_type_cast.message,
  index: 0,
  newFileContent:
`const a = {};
let b: {};
b = a;
interface Foo {
  x?: string;
}
const foo1: Foo = {x: "ok"} as Foo; // cast technically erases type information, not a no-op
const foo2: Foo = foo1 as Foo;
class A {
  item: any;
}
class B {
  item: any;
}
const aCls = new A();
const bCls = new B();
const aCls2: A = bCls as A;
const bCls2: B = aCls as A;
const tup = [0] as [0]; // required to preserve literalness`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Remove_all_unnecessary_type_casts.message,
  fixId: "removeUnnecessaryCast",
  newFileContent:
`const a = {};
let b: {};
b = a;
interface Foo {
  x?: string;
}
const foo1: Foo = {x: "ok"} as Foo; // cast technically erases type information, not a no-op
const foo2: Foo = foo1;
class A {
  item: any;
}
class B {
  item: any;
}
const aCls = new A();
const bCls = new B();
const aCls2: A = bCls;
const bCls2: B = aCls;
const tup = [0] as [0]; // required to preserve literalness`
});
