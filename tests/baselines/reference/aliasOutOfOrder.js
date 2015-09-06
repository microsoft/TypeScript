//// [aliasOutOfOrder.ts]
import a = M.B; // error
import b = M.I; // no error
import d = c.B; // error
import e = c.I; // no error
import f = c; // error
import c = M; // error
import g = c.B; // no error
import h = c.I; // no error
import i = c; // no error
class C extends a { // no error 
}
class D extends M.B { // error
}
module M {
    export class B {
    }
    export interface I {
    }
}
import a1 = M.B; // no error
import b1 = M.I; // no error
import d1 = c1.B; // error
import e1 = c1.I; // no error
import f1 = c1; // error
import c1 = M; // no error
import g1 = c1.B; // no error
import h1 = c1.I; // no error
import i1 = c1; // no error

//// [aliasOutOfOrder.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var a = M.B; // error
var d = c.B; // error
var f = c; // error
var c = M; // error
var g = c.B; // no error
var i = c; // no error
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(a);
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(M.B);
var M;
(function (M) {
    var B = (function () {
        function B() {
        }
        return B;
    })();
    M.B = B;
})(M || (M = {}));
var a1 = M.B; // no error
var d1 = c1.B; // error
var f1 = c1; // error
var c1 = M; // no error
var g1 = c1.B; // no error
var i1 = c1; // no error
