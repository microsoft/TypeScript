//// [tests/cases/compiler/systemModule17.ts] ////

//// [f1.ts]
export class A {}
export interface I {}

//// [f2.ts]
var x = 1;
interface I { }

namespace N {
	export var x = 1;
	export interface I { }	
}

import IX = N.x;
import II = N.I;
import { A, A as EA, I as EI } from "f1";

export {x};
export {x as x1};

export {I};
export {I as I1};

export {A};
export {A as A1};

export {EA};
export {EA as EA1};

export {EI };
export {EI as EI1};

export {IX};
export {IX as IX1};

export {II};
export {II as II1};

//// [f1.js]
System.register([], function (exports_1, context_1) {
    var A;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            A = /** @class */ (function () {
                function A() {
                }
                return A;
            }());
            exports_1("A", A);
        }
    };
});
//// [f2.js]
System.register(["f1"], function (exports_1, context_1) {
    var x, N, IX, f1_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (f1_1_1) {
                f1_1 = f1_1_1;
            }
        ],
        execute: function () {
            x = 1;
            exports_1("x", x);
            exports_1("x1", x);
            (function (N) {
                N.x = 1;
            })(N || (N = {}));
            IX = N.x;
            exports_1("IX", IX);
            exports_1("IX1", IX);
            exports_1("A", f1_1.A);
            exports_1("A1", f1_1.A);
            exports_1("EA", f1_1.A);
            exports_1("EA1", f1_1.A);
        }
    };
});
