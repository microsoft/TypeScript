//// [tests/cases/compiler/mergedModuleDeclarationCodeGen5.ts] ////

//// [mergedModuleDeclarationCodeGen5.ts]
module M.buz.plop {
    export function doom() { }
    export function M() { }
}
module M.buz.plop {
    function gunk() { }
    function buz() { }
    export class fudge { }
    export enum plop { }

    // Emit these references as follows
    var v1 = gunk; // gunk
    var v2 = buz; // buz
    export var v3 = doom; // _plop.doom
    export var v4 = M; // _plop.M
    export var v5 = fudge; // fudge
    export var v6 = plop; // plop
}

//// [mergedModuleDeclarationCodeGen5.js]
var M;
(function (M_1) {
    var buz;
    (function (buz) {
        var plop;
        (function (plop) {
            function doom() { }
            plop.doom = doom;
            function M() { }
            plop.M = M;
        })(plop = buz.plop || (buz.plop = {}));
    })(buz = M_1.buz || (M_1.buz = {}));
})(M || (M = {}));
(function (M) {
    var buz;
    (function (buz_1) {
        var plop;
        (function (plop_1) {
            function gunk() { }
            function buz() { }
            var fudge = /** @class */ (function () {
                function fudge() {
                }
                return fudge;
            }());
            plop_1.fudge = fudge;
            var plop;
            (function (plop) {
            })(plop = plop_1.plop || (plop_1.plop = {}));
            // Emit these references as follows
            var v1 = gunk; // gunk
            var v2 = buz; // buz
            plop_1.v3 = plop_1.doom; // _plop.doom
            plop_1.v4 = plop_1.M; // _plop.M
            plop_1.v5 = fudge; // fudge
            plop_1.v6 = plop; // plop
        })(plop = buz_1.plop || (buz_1.plop = {}));
    })(buz = M.buz || (M.buz = {}));
})(M || (M = {}));
