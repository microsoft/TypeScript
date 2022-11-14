/// <reference path="fourslash.ts" />
////const a = {};
////let b: {};
////b = <{}>a;
////interface Foo {
////  x?: string;
////}
////const foo1: Foo = <Foo>{x: "ok"}; // cast technically erases type information, not a no-op
////const foo2: Foo = <Foo>foo1;
////class A {
////  item: any;
////}
////class B {
////  item: any;
////}
////const aCls = new A();
////const bCls = new B();
////const aCls2: A = <A>bCls;
////const bCls2: B = <A>aCls;

verify.codeFix({
  description: ts.Diagnostics.Remove_unnecessary_type_assertion.message,
  index: 0,
  newFileContent:
`const a = {};
let b: {};
b = a;
interface Foo {
  x?: string;
}
const foo1: Foo = <Foo>{x: "ok"}; // cast technically erases type information, not a no-op
const foo2: Foo = <Foo>foo1;
class A {
  item: any;
}
class B {
  item: any;
}
const aCls = new A();
const bCls = new B();
const aCls2: A = <A>bCls;
const bCls2: B = <A>aCls;`
});

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Remove_all_unnecessary_type_assertions.message,
  fixId: "removeUnnecessaryTypeAssertion",
  newFileContent:
`const a = {};
let b: {};
b = a;
interface Foo {
  x?: string;
}
const foo1: Foo = <Foo>{x: "ok"}; // cast technically erases type information, not a no-op
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
const bCls2: B = aCls;`
});
