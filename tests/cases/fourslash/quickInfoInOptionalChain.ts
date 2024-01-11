/// <reference path='fourslash.ts'/>
//
// @strict: true
//
//// interface A {
////   arr: string[];
//// }
////
//// function test(a?: A): string {
////   return a?.ar/*1*/r.length ? "A" : "B";
//// }
//// 
//// interface Foo { bar: { baz: string } };
//// declare const foo: Foo | undefined;
////
//// if (foo?.b/*2*/ar.b/*3*/az) {}
////
//// interface Foo2 { bar?: { baz: { qwe: string } } };
//// declare const foo2: Foo2;
////
//// if (foo2.b/*4*/ar?.b/*5*/az.q/*6*/we) {}

verify.quickInfoAt("1", "(property) A.arr: string[]");
verify.quickInfoAt("2", "(property) Foo.bar: {\n    baz: string;\n}");
verify.quickInfoAt("3", "(property) baz: string | undefined");
verify.quickInfoAt("4", "(property) Foo2.bar?: {\n    baz: {\n        qwe: string;\n    };\n} | undefined");
verify.quickInfoAt("5", "(property) baz: {\n    qwe: string;\n}");
verify.quickInfoAt("6", "(property) qwe: string | undefined");
