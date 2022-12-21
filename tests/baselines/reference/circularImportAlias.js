//// [circularImportAlias.ts]
// expected no error

module B {
    export import a = A;
    export class D extends a.C {
        id: number;
    }
}

module A {
    export class C { name: string }
    export import b = B;
}

var c: { name: string };
var c = new B.a.C();




//// [circularImportAlias.js]
// expected no error
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
var B;
(function (B) {
    B.a = A;
    var D = /** @class */ (function (_super) {
        __extends(D, _super);
        function D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D;
    }(B.a.C));
    B.D = D;
})(B || (B = {}));
var A;
(function (A) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    A.C = C;
    A.b = B;
})(A || (A = {}));
var c;
var c = new B.a.C();
