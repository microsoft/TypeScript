//// [classExtendsItself.ts]
class C extends C { } // error

class D<T> extends D<T> { } // error

class E<T> extends E<string> { } // error

//// [classExtendsItself.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super.apply(this, arguments) || this;
    }
    return C;
}(C)); // error
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super.apply(this, arguments) || this;
    }
    return D;
}(D)); // error
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        return _super.apply(this, arguments) || this;
    }
    return E;
}(E)); // error
