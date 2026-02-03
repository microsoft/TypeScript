//// [tests/cases/compiler/classInheritence.ts] ////

//// [classInheritence.ts]
class B extends A { }
class A extends A { }

//// [classInheritence.js]
"use strict";
class B extends A {
}
class A extends A {
}
