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
    A.prototype.B = function () {
        return 42;
    };
    return A;
})();
//# sourceMappingURL=es3-amd.js.map

//// [es3-amd.d.ts]
declare class A {
    constructor();
    B(): number;
}
