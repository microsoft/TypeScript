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
var c = (function () {
    function c() {
    }
    var proto_1 = c.prototype;
    proto_1.method = function () {
        if (true) {
            function foo() { }
            foo(); // ok
        }
        foo(); // not ok
    };
    return c;
}());
