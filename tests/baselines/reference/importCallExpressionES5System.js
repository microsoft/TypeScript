//// [tests/cases/conformance/dynamicImport/importCallExpressionES5System.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
import("./0");
var p1 = import("./0");
p1.then(zero => {
    return zero.foo();
});

export var p2 = import("./0");

function foo() {
    const p2 = import("./0");
}

class C {
    method() {
        const loadAsync = import ("./0");
    }
}

export class D {
    method() {
        const loadAsync = import ("./0");
    }
}

//// [0.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { return "foo"; }
    exports_1("foo", foo);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [1.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __names = (this && this.__names) || (function() {
        var name = Object.defineProperty ? (function(proto, name) {
            Object.defineProperty(proto[name], 'name', { 
                value: name, configurable: true
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
    var __moduleName = context_1 && context_1.id;
    function foo() {
        var p2 = context_1.import("./0");
    }
    var p1, p2, C, D;
    return {
        setters: [],
        execute: function () {
            context_1.import("./0");
            p1 = context_1.import("./0");
            p1.then(function (zero) {
                return zero.foo();
            });
            exports_1("p2", p2 = context_1.import("./0"));
            C = (function () {
                function C() {
                }
                C.prototype.method = function () {
                    var loadAsync = context_1.import("./0");
                };
                __names(C.prototype, ["method"]);
                return C;
            }());
            D = (function () {
                function D() {
                }
                D.prototype.method = function () {
                    var loadAsync = context_1.import("./0");
                };
                __names(D.prototype, ["method"]);
                return D;
            }());
            exports_1("D", D);
        }
    };
});
