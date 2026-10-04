//// [tests/cases/compiler/classExtendsMultipleBaseClasses.ts] ////

//// [classExtendsMultipleBaseClasses.ts]
class A { }
class B { }
class C extends A,B { }

//// [classExtendsMultipleBaseClasses.js]
"use strict";
class A {
}
class B {
}
class C extends A, B {
}
