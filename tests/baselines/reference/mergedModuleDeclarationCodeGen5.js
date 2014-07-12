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
(function (_M) {
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
    })(_M.buz || (_M.buz = {}));
    var buz = _M.buz;
})(M || (M = {}));
var M;
(function (M) {
    (function (_buz) {
        (function (_plop) {
            function gunk() {
            }
            function buz() {
            }
            var fudge = (function () {
                function fudge() {
                }
                return fudge;
            })();
            _plop.fudge = fudge;
            (function (plop) {
            })(_plop.plop || (_plop.plop = {}));
            var plop = _plop.plop;

            // Emit these references as follows
            var v1 = gunk;
            var v2 = buz;
            _plop.v3 = _plop.doom;
            _plop.v4 = _plop.M;
            _plop.v5 = fudge;
            _plop.v6 = plop;
        })(_buz.plop || (_buz.plop = {}));
        var plop = _buz.plop;
    })(M.buz || (M.buz = {}));
    var buz = M.buz;
})(M || (M = {}));
