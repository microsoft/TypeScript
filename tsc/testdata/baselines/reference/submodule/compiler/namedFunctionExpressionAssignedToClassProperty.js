//// [tests/cases/compiler/namedFunctionExpressionAssignedToClassProperty.ts] ////

//// [namedFunctionExpressionAssignedToClassProperty.ts]
class Foo{

       a = function bar(){

       }; // this shouldn't crash the compiler...

       

       constructor(){

       }

}


//// [namedFunctionExpressionAssignedToClassProperty.js]
"use strict";
class Foo {
    a = function bar() {
    }; // this shouldn't crash the compiler...
    constructor() {
    }
}
