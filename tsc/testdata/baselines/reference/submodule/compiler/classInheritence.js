//// [tests/cases/compiler/classInheritence.ts] ////

//// [classInheritence.ts]
class B extends A { }
class A extends A { }

//// [classInheritence.js]
class B extends A {
}
class A extends A {
}
