//// [extBaseClass2.ts]
module N {
    export class C4 extends M.B {
    }
}

module M {
    export class C5 extends B {
    }
}


//// [extBaseClass2.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var N;
(function (N) {
    var C4 = (function (_super) {
        __extends(C4, _super);
        function C4() {
            _super.apply(this, arguments);
        }
        return C4;
    })(M.B);
    N.C4 = C4;
})(N || (N = {}));
var M;
(function (M) {
    var C5 = (function (_super) {
        __extends(C5, _super);
        function C5() {
            _super.apply(this, arguments);
        }
        return C5;
    })(B);
    M.C5 = C5;
})(M || (M = {}));
