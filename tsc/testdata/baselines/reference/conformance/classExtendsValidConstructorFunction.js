//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsValidConstructorFunction.ts] ////

//// [classExtendsValidConstructorFunction.ts]
function foo() { }

var x = new foo(); // can be used as a constructor function

class C extends foo { } // error, cannot extend it though

//// [classExtendsValidConstructorFunction.js]
"use strict";
function foo() { }
var x = new foo(); // can be used as a constructor function
class C extends foo {
} // error, cannot extend it though
