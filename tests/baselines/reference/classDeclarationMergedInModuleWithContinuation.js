//// [classDeclarationMergedInModuleWithContinuation.ts]
module M {
    export class N { }
    export module N {
        export var v = 0;
    }
}

module M {
    export class O extends M.N {
    }
}

//// [classDeclarationMergedInModuleWithContinuation.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var M;
(function (M) {
    var N = (function () {
        function N() {
        }
        return N;
    })();
    M.N = N;
    (function (N) {
        N.v = 0;
    })(M.N || (M.N = {}));
    var N = M.N;
})(M || (M = {}));

var M;
(function (M) {
    var O = (function (_super) {
        __extends(O, _super);
        function O() {
            _super.apply(this, arguments);
        }
        return O;
    })(M.N);
    M.O = O;
})(M || (M = {}));
