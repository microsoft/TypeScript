//// [tests/cases/compiler/es5-souremap-amd.ts] ////

//// [es5-souremap-amd.ts]
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

//// [es5-souremap-amd.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
}());
//# sourceMappingURL=es5-souremap-amd.js.map