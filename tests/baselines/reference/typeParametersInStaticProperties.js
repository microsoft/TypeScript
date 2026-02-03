//// [tests/cases/compiler/typeParametersInStaticProperties.ts] ////

//// [typeParametersInStaticProperties.ts]
class foo<T> {
    static P: T;
} 

//// [typeParametersInStaticProperties.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
