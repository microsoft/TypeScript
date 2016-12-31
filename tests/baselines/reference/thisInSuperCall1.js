//// [thisInSuperCall1.ts]
class Base { 
    constructor(a: any) {}
}

class Foo extends Base {
    constructor(public x: number) {
        super(this);
    }
}


//// [thisInSuperCall1.js]
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
    function Base(a) {
    }
    return Base;
}());
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo(x) {
        var _this = _super.call(this, _this) || this;
        _this.x = x;
        return _this;
    }
    return Foo;
}(Base));
