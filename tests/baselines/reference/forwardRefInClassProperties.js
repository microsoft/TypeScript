//// [forwardRefInClassProperties.ts]
class Test
{
    _b = this._a; // undefined, no error/warning
    _a = 3;

    static _B = Test._A; // undefined, no error/warning
    static _A = 3;

    method()
    {
        let a = b; // Block-scoped variable 'b' used before its declaration
        let b = 3;
    }
}


//// [forwardRefInClassProperties.js]
var Test = (function () {
    function Test() {
        this._b = this._a; // undefined, no error/warning
        this._a = 3;
    }
    Test.prototype.method = function () {
        var a = b; // Block-scoped variable 'b' used before its declaration
        var b = 3;
    };
    return Test;
}());
Test._B = Test._A; // undefined, no error/warning
Test._A = 3;
