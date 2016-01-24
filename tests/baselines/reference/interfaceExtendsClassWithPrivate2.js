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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
        this.x = 1;
    }
    C.prototype.foo = function (x) { return x; };
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
        this.x = 2;
        this.y = 3;
    }
    D.prototype.foo = function (x) { return x; };
    D.prototype.other = function (x) { return x; };
    D.prototype.bar = function () { };
    return D;
}(C));
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
        this.x = "";
    }
    D2.prototype.foo = function (x) { return x; };
    D2.prototype.other = function (x) { return x; };
    D2.prototype.bar = function () { };
    return D2;
}(C));
