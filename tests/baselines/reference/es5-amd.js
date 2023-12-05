//// [tests/cases/compiler/es5-amd.ts] ////

//// [es5-amd.ts]
class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

//// [es5-amd.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
}());
