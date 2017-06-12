//// [es3-amd.ts]
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

//// [es3-amd.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.B = function () {
        return 42;
    };
    return A;
}());
