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
(function (M) {
    (function (buz) {
        (function (plop) {
            function doom() {
            }
            plop.doom = doom;
            function M() {
            }
            plop.M = M;
        })(buz.plop || (buz.plop = {}));
        var plop = buz.plop;
    })(M.buz || (M.buz = {}));
    var buz = M.buz;
})(M || (M = {}));
var M;
(function (M) {
    (function (buz) {
        (function (plop) {
            function gunk() {
            }
            function buz() {
            }
            var fudge = (function () {
                function fudge() {
                }
                return fudge;
            })();
            plop.fudge = fudge;
            (function (plop) {
            })(plop.plop || (plop.plop = {}));
            var plop = plop.plop;
            var v1 = gunk;
            var v2 = buz;
            plop.v3 = plop.doom;
            plop.v4 = plop.M;
            plop.v5 = fudge;
            plop.v6 = plop;
        })(buz.plop || (buz.plop = {}));
        var plop = buz.plop;
    })(M.buz || (M.buz = {}));
    var buz = M.buz;
})(M || (M = {}));
