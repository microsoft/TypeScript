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
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base(a) {
    }
    return Base;
}());
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo(x) {
        _super.call(this, this);
        this.x = x;
    }
    return Foo;
}(Base));
