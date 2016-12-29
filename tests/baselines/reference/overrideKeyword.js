//// [overrideKeyword.ts]
class Base {
    public toString() { return "base"; };
}

class Derived extends Base {
    /** @override */
    public override toString() { return "derived"; };
}


//// [overrideKeyword.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    Base.prototype.toString = function () { return "base"; };
    ;
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super.apply(this, arguments) || this;
    }
    /** @override */
    Derived.prototype.toString = function () { return "derived"; };
    ;
    return Derived;
}(Base));
