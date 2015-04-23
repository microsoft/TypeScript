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
var A = (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
})();
//# sourceMappingURL=es5-umd.js.map

//// [es5-umd.d.ts]
declare class A {
    constructor();
    B(): number;
}
