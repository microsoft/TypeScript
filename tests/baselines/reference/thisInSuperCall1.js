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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base(a) {
    }
    return Base;
})();
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo(x) {
        _super.call(this, this);
        this.x = x;
    }
    return Foo;
})(Base);
