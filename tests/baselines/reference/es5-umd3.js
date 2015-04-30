//// [es5-umd3.ts]

export default class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}


//// [es5-umd3.js]
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        A.prototype.B = function () {
            return 42;
        };
        return A;
    })();
    exports.default = A;
});
//# sourceMappingURL=es5-umd3.js.map

//// [es5-umd3.d.ts]
export default class A {
    constructor();
    B(): number;
}
