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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var B;
(function (B) {
    var a = A;
    B.a = a;
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    })(a.C);
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
    var b = B;
    A.b = b;
})(A || (A = {}));

var c;
var c = new B.a.C();
