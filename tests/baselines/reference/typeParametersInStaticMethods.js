//// [typeParametersInStaticMethods.ts]
class foo<T> {
    static M(x: (x: T) => { x: { y: T } }) {
    }
} 

//// [typeParametersInStaticMethods.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    foo.M = function (x) {
    };
    return foo;
}());
