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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B;
(function (B) {
    B.a = A;
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    })(B.a.C);
    B.D = D;
})(B || (B = {}));
var A;
(function (A) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    A.C = C;
    A.b = B;
})(A || (A = {}));
var c;
var c = new B.a.C();
