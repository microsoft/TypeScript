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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var M;
(function (M) {
    var N = (function () {
        function N() {
        }
        return N;
    })();
    M.N = N;
    var N;
    (function (N) {
        N.v = 0;
    })(N = M.N || (M.N = {}));
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
