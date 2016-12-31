//// [classConstructorParametersAccessibility2.ts]
class C1 {
    constructor(public x?: number) { }
}
var c1: C1;
c1.x // OK


class C2 {
    constructor(private p?: number) { }
}
var c2: C2;
c2.p // private, error


class C3 {
    constructor(protected p?: number) { }
}
var c3: C3;
c3.p // protected, error
class Derived extends C3 {
    constructor(p: number) {
        super(p);
        this.p; // OK
    }
}


//// [classConstructorParametersAccessibility2.js]
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
var C1 = (function () {
    function C1(x) {
        this.x = x;
    }
    return C1;
}());
var c1;
c1.x; // OK
var C2 = (function () {
    function C2(p) {
        this.p = p;
    }
    return C2;
}());
var c2;
c2.p; // private, error
var C3 = (function () {
    function C3(p) {
        this.p = p;
    }
    return C3;
}());
var c3;
c3.p; // protected, error
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived(p) {
        var _this = _super.call(this, p) || this;
        _this.p; // OK
        return _this;
    }
    return Derived;
}(C3));
