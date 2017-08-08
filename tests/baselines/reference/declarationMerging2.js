//// [tests/cases/compiler/declarationMerging2.ts] ////

//// [a.ts]
export class A {
    protected _f: number;
    getF() { return this._f; }
}

//// [b.ts]
export {}
declare module "./a" {
    interface A {
        run();
    }
}

//// [a.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var A = (function () {
        function A() {
        }
        A.prototype.getF = function () { return this._f; };
        __names(A.prototype, ["getF"]);
        return A;
    }());
    exports.A = A;
});
//// [b.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
