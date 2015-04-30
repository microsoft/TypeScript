//// [es5-umd4.ts]

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

export = A;


//// [es5-umd4.js]
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
    return A;
});
//# sourceMappingURL=es5-umd4.js.map

//// [es5-umd4.d.ts]
declare class A {
    constructor();
    B(): number;
}
export = A;
