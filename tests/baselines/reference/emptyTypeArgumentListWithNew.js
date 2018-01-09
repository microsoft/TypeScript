//// [emptyTypeArgumentListWithNew.ts]
class foo<T> { }
new foo<>();

//// [emptyTypeArgumentListWithNew.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
new foo();
