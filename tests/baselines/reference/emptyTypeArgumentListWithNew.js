//// [emptyTypeArgumentListWithNew.ts]
class foo<T> { }
new foo<>();

//// [emptyTypeArgumentListWithNew.js]
var foo = (function () {
    function foo() {
    }
    return foo;
}());
new foo();
