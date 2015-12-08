//// [systemModuleDeclarationMerging.ts]

export function F() {}
export module F { var x; }

export class C {}
export module C { var x; }

export enum E {}
export module E { var x; }

//// [systemModuleDeclarationMerging.js]
System.register([], function(exports_1) {
    "use strict";
    var F, C, E;
    function F() { }
    exports_1("F", F);
    return {
        setters:[],
        execute: function() {
            (function (F) {
                var x;
            })(F = F || (F = {}));
            exports_1("F", F);
            C = (function () {
                function C() {
                }
                return C;
            })();
            exports_1("C", C);
            (function (C) {
                var x;
            })(C = C || (C = {}));
            exports_1("C", C);
            (function (E) {
            })(E || (E = {}));
            exports_1("E", E);
            (function (E) {
                var x;
            })(E = E || (E = {}));
            exports_1("E", E);
        }
    }
});
