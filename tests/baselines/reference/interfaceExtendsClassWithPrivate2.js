//// [interfaceExtendsClassWithPrivate2.ts]
class C {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

class D extends C implements I { // error
    public foo(x: any) { return x; }
    private x = 2;
    private y = 3;
    other(x: any) { return x; }
    bar() {}
} 

class D2 extends C implements I { // error
    public foo(x: any) { return x; }
    private x = "";
    other(x: any) { return x; }
    bar() { }
} 

//// [interfaceExtendsClassWithPrivate2.js]
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
var C = (function () {
    function C() {
        this.x = 1;
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) { return x; };
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 2;
        _this.y = 3;
        return _this;
    }
    var proto_2 = D.prototype;
    proto_2.foo = function (x) { return x; };
    proto_2.other = function (x) { return x; };
    proto_2.bar = function () { };
    return D;
}(C));
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = "";
        return _this;
    }
    var proto_3 = D2.prototype;
    proto_3.foo = function (x) { return x; };
    proto_3.other = function (x) { return x; };
    proto_3.bar = function () { };
    return D2;
}(C));
