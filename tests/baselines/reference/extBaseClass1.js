//// [extBaseClass1.ts]
module M {
    export class B {
	    public x=10;
    }

    export class C extends B {
    }
}

module M {
    export class C2 extends B {
    }
}

module N {
    export class C3 extends M.B {
    }
}


//// [extBaseClass1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var M;
(function (M) {
    var B = /** @class */ (function () {
        function B() {
            this.x = 10;
        }
        return B;
    }());
    M.B = B;
    var C = /** @class */ (function (_super) {
        __extends(C, _super);
        function C() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return C;
    }(B));
    M.C = C;
})(M || (M = {}));
(function (M) {
    var C2 = /** @class */ (function (_super) {
        __extends(C2, _super);
        function C2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return C2;
    }(M.B));
    M.C2 = C2;
})(M || (M = {}));
var N;
(function (N) {
    var C3 = /** @class */ (function (_super) {
        __extends(C3, _super);
        function C3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return C3;
    }(M.B));
    N.C3 = C3;
})(N || (N = {}));
