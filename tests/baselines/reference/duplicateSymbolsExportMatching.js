//// [duplicateSymbolsExportMatching.js]
define(["require", "exports"], function(require, exports) {
    

    // Should report error only once for instantiated module
    var M;
    (function (M) {
        var inst;
        (function (inst) {
            var t;
        })(inst || (inst = {}));
        (function (inst) {
            var t;
        })(M.inst || (M.inst = {}));
        var inst = M.inst;
    })(M || (M = {}));

    // Variables of the same / different type
    var M2;
    (function (M2) {
        var v;
        M2.v;
        var w;
        M2.w;
    })(M2 || (M2 = {}));

    var M;
    (function (M) {
        var F;
        (function (F) {
            var t;
        })(F || (F = {}));
        function F() {
        }
        M.F = F;
    })(M || (M = {}));

    var M;
    (function (M) {
        var C = (function () {
            function C() {
            }
            return C;
        })();

        (function (C) {
            var t;
        })(M.C || (M.C = {}));
        var C = M.C;
    })(M || (M = {}));

    
});
