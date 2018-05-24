//// [systemModuleDeclarationMerging.ts]
export function F() {}
export module F { var x; }

export class C {}
export module C { var x; }

export enum E {}
export module E { var x; }

//// [systemModuleDeclarationMerging.js]
System.register([], function (exports_1, context_1) {
    var C, E;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function F() { }
    exports_1("F", F);
    return {
        setters: [],
        execute: function () {
            (function (F) {
                var x;
            })(F || (F = {}));
            exports_1("F", F);
            C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports_1("C", C);
            (function (C) {
                var x;
            })(C || (C = {}));
            exports_1("C", C);
            (function (E) {
            })(E || (E = {}));
            exports_1("E", E);
            (function (E) {
                var x;
            })(E || (E = {}));
            exports_1("E", E);
        }
    };
});
