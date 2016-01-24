//// [classExtendingQualifiedName2.ts]
module M {
    export class C {
    }

    class D extends M.C {
    }
}

//// [classExtendingQualifiedName2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    }(M.C));
})(M || (M = {}));
