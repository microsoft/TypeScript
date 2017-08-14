//// [es5-umd.ts]
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


//// [es5-umd.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
}());
