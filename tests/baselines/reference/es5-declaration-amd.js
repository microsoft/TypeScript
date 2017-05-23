//// [es5-declaration-amd.ts]
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

//// [es5-declaration-amd.js]
var A = (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
}());


//// [es5-declaration-amd.d.ts]
declare class A {
    constructor();
    B(): number;
}
