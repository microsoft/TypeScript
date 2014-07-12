//// [optionalConstructorArgInSuper.ts]
class Base {
    constructor(opt?) { }
    foo(other?) { }
}
class Derived extends Base {
}
var d = new Derived(); // bug caused an error here, couldn't select overload
var d2: Derived;
d2.foo(); 


//// [optionalConstructorArgInSuper.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base(opt) {
    }
    Base.prototype.foo = function (other) {
    };
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
var d = new Derived();
var d2;
d2.foo();
