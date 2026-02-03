//// [tests/cases/compiler/blockScopedFunctionDeclarationInStrictClass.ts] ////

//// [blockScopedFunctionDeclarationInStrictClass.ts]
class c {
    method() {
        if (true) {
            function foo() { }
            foo(); // ok
        }
        foo(); // not ok
    }
}

//// [blockScopedFunctionDeclarationInStrictClass.js]
var c = /** @class */ (function () {
    function c() {
    }
    c.prototype.method = function () {
        if (true) {
            function foo() { }
            foo(); // ok
        }
        foo(); // not ok
    };
    return c;
}());
