//// [emptyTypeArgumentListWithNew.ts]
class foo<T> { }
new foo<>();

// https://github.com/microsoft/TypeScript/issues/33041
class noParams {}
new noParams<>();

//// [emptyTypeArgumentListWithNew.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
new foo();
// https://github.com/microsoft/TypeScript/issues/33041
var noParams = /** @class */ (function () {
    function noParams() {
    }
    return noParams;
}());
new noParams();
