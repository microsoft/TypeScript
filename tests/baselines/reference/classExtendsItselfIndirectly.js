//// [classExtendsItselfIndirectly.ts]
class C extends E { foo: string; } // error

class D extends C { bar: string; }

class E extends D { baz: number; }

class C2<T> extends E2<T> { foo: T; } // error

class D2<T> extends C2<T> { bar: T; }

class E2<T> extends D2<T> { baz: T; }

//// [classExtendsItselfIndirectly.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(E)); // error
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return E;
}(D));
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(E2)); // error
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(C2));
var E2 = (function (_super) {
    __extends(E2, _super);
    function E2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return E2;
}(D2));
