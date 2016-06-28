//// [typeParametersInStaticProperties.ts]
class foo<T> {
    static P: T;
} 

//// [typeParametersInStaticProperties.js]
var foo = (function () {
    function foo() {
    }
    return foo;
}());
