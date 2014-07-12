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
    A.prototype.B = function () {
        return 42;
    };
    return A;
})();
//# sourceMappingURL=es3-declaration-amd.js.map

//// [es3-declaration-amd.d.ts]
