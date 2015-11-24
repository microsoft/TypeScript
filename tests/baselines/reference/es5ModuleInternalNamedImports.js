//// [es5ModuleInternalNamedImports.ts]

export module M {
    // variable
    export var M_V = 0;
    // interface
    export interface M_I { }
    //calss
    export class M_C { }
    // instantiated module
    export module M_M { var x; }
    // uninstantiated module
    export module M_MU { }
    // function
    export function M_F() { }
    // enum
    export enum M_E { }
    // type
    export type M_T = number;
    // alias
    export import M_A = M_M;

    // Reexports
    export {M_V as v};
    export {M_I as i};
    export {M_C as c};
    export {M_M as m};
    export {M_MU as mu};
    export {M_F as f};
    export {M_E as e};
    export {M_A as a};
}


//// [es5ModuleInternalNamedImports.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var M;
    (function (M) {
        // variable
        M.M_V = 0;
        //calss
        var M_C = (function () {
            function M_C() {
            }
            return M_C;
        })();
        M.M_C = M_C;
        // instantiated module
        var M_M;
        (function (M_M) {
            var x;
        })(M_M = M.M_M || (M.M_M = {}));
        // function
        function M_F() { }
        M.M_F = M_F;
        // enum
        (function (M_E) {
        })(M.M_E || (M.M_E = {}));
        var M_E = M.M_E;
        // alias
        M.M_A = M_M;
        // Reexports
    })(M = exports.M || (exports.M = {}));
});
