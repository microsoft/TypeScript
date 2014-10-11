//// [es6-amd.ts]

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

//// [es6-amd.js]
var A = (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
})();
//# sourceMappingURL=es6-amd.js.map

//// [es6-amd.d.ts]
declare class A {
    constructor();
    B(): number;
}
