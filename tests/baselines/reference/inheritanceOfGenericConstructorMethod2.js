//// [inheritanceOfGenericConstructorMethod2.ts]
module M {
   export class C1 { }
   export class C2<T> { }
}
module N {
   export class D1 extends M.C1 { }
   export class D2<T> extends M.C2<T> { }
}

var c = new M.C2<number>(); // no error
var n = new N.D1(); // no error
var n2 = new N.D2<number>(); // error
var n3 = new N.D2(); // no error, D2<any>


//// [inheritanceOfGenericConstructorMethod2.js]
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
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    M.C1 = C1;
    var C2 = /** @class */ (function () {
        function C2() {
        }
        return C2;
    }());
    M.C2 = C2;
})(M || (M = {}));
var N;
(function (N) {
    var D1 = /** @class */ (function (_super) {
        __extends(D1, _super);
        function D1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D1;
    }(M.C1));
    N.D1 = D1;
    var D2 = /** @class */ (function (_super) {
        __extends(D2, _super);
        function D2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D2;
    }(M.C2));
    N.D2 = D2;
})(N || (N = {}));
var c = new M.C2(); // no error
var n = new N.D1(); // no error
var n2 = new N.D2(); // error
var n3 = new N.D2(); // no error, D2<any>
