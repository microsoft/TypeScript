//// [privateInstanceMemberAccessibility.ts]
class Base {
    private foo: string;
}

class Derived extends Base {
    x = super.foo; // error
    y() {
        return super.foo; // error
    }
    z: typeof super.foo; // error

    a: this.foo; // error
}

//// [privateInstanceMemberAccessibility.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
        this.x = _super.prototype.foo; // error
        this.z = _super.prototype.foo; // error
    }
    Derived.prototype.y = function () {
        return _super.prototype.foo; // error
    };
    return Derived;
}(Base));
