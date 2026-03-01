//// [tests/cases/compiler/mismatchedClassConstructorVariable.ts] ////

//// [mismatchedClassConstructorVariable.ts]
var baz: foo;
class baz { }
class foo { }

//// [mismatchedClassConstructorVariable.js]
"use strict";
var baz;
class baz {
}
class foo {
}
