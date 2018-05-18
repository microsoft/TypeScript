//// [exportNonInitializedVariablesSystem.ts]
var;
let;
const;

export var a;
export let b;
export var c: string;
export let d: number;
class A {}
export var e: A;
export let f: A;

namespace B {
    export let a = 1, b, c = 2;
    export let x, y, z;
}

module C {
    export var a = 1, b, c = 2;
    export var x, y, z;
}

// Shouldn't be filtered
export var a1 = 1;
export let b1 = 1;
export var c1: string = 'a';
export let d1: number = 1;
class D {}
export var e1 = new D;
export let f1 = new D;
export var g1: D = new D;
export let h1: D = new D;


//// [exportNonInitializedVariablesSystem.js]
System.register([], function (exports_1, context_1) {
    var a, b, c, d, A, e, f, B, C, a1, b1, c1, d1, D, e1, f1, g1, h1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            let;
            A = /** @class */ (function () {
                function A() {
                }
                return A;
            }());
            (function (B) {
                B.a = 1, B.c = 2;
            })(B || (B = {}));
            (function (C) {
                C.a = 1, C.c = 2;
            })(C || (C = {}));
            // Shouldn't be filtered
            exports_1("a1", a1 = 1);
            exports_1("b1", b1 = 1);
            exports_1("c1", c1 = 'a');
            exports_1("d1", d1 = 1);
            D = /** @class */ (function () {
                function D() {
                }
                return D;
            }());
            exports_1("e1", e1 = new D);
            exports_1("f1", f1 = new D);
            exports_1("g1", g1 = new D);
            exports_1("h1", h1 = new D);
        }
    };
});
