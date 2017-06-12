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
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.B = function () {
        return 42;
    };
    return A;
}());
//# sourceMappingURL=es5-souremap-amd.js.map