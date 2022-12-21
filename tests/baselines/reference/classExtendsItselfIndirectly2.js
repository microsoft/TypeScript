//// [classExtendsItselfIndirectly2.ts]
class C extends N.E { foo: string; } // error

module M {
    export class D extends C { bar: string; }

}

module N {
    export class E extends M.D { baz: number; }
}

module O {
    class C2<T> extends Q.E2<T> { foo: T; } // error

    module P {
        export class D2<T> extends C2<T> { bar: T; }
    }

    module Q {
        export class E2<T> extends P.D2<T> { baz: T; }
    }
}

//// [classExtendsItselfIndirectly2.js]
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
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(N.E)); // error
var M;
(function (M) {
    var D = /** @class */ (function (_super) {
        __extends(D, _super);
        function D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D;
    }(C));
    M.D = D;
})(M || (M = {}));
var N;
(function (N) {
    var E = /** @class */ (function (_super) {
        __extends(E, _super);
        function E() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return E;
    }(M.D));
    N.E = E;
})(N || (N = {}));
var O;
(function (O) {
    var C2 = /** @class */ (function (_super) {
        __extends(C2, _super);
        function C2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return C2;
    }(Q.E2)); // error
    var P;
    (function (P) {
        var D2 = /** @class */ (function (_super) {
            __extends(D2, _super);
            function D2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return D2;
        }(C2));
        P.D2 = D2;
    })(P || (P = {}));
    var Q;
    (function (Q) {
        var E2 = /** @class */ (function (_super) {
            __extends(E2, _super);
            function E2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return E2;
        }(P.D2));
        Q.E2 = E2;
    })(Q || (Q = {}));
})(O || (O = {}));
