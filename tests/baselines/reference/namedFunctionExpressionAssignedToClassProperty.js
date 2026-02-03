//// [tests/cases/compiler/namedFunctionExpressionAssignedToClassProperty.ts] ////

//// [namedFunctionExpressionAssignedToClassProperty.ts]
class Foo{

       a = function bar(){

       }; // this shouldn't crash the compiler...

       

       constructor(){

       }

}


//// [namedFunctionExpressionAssignedToClassProperty.js]
class Foo {
    constructor() {
        this.a = function bar() {
        }; // this shouldn't crash the compiler...
    }
}
