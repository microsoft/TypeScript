//// [es3-declaration-amd.ts]
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

//// [es3-declaration-amd.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.B = function () {
        return 42;
    };
    return A;
}());


//// [es3-declaration-amd.d.ts]
declare class A {
    constructor();
    B(): number;
}
