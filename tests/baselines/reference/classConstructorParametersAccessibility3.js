//// [classConstructorParametersAccessibility3.ts]
class Base {
    constructor(protected p: number) { }
}

class Derived extends Base {
    constructor(public p: number) {
        super(p);
        this.p; // OK
    }
}

var d: Derived;
d.p;  // public, OK

//// [classConstructorParametersAccessibility3.js]
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
var Base = (function () {
    function Base(p) {
        this.p = p;
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived(p) {
        var _this = _super.call(this, p) || this;
        _this.p = p;
        _this.p; // OK
        return _this;
    }
    return Derived;
}(Base));
var d;
d.p; // public, OK
