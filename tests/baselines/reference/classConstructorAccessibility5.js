//// [classConstructorAccessibility5.ts]
class Base {
    protected constructor() { }
}
class Derived extends Base {
    static make() { new Base() } // ok
}

class Unrelated {
    static fake() { new Base() } // error
}


//// [classConstructorAccessibility5.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.make = function () { new Base(); }; // ok
    return Derived;
}(Base));
var Unrelated = /** @class */ (function () {
    function Unrelated() {
    }
    Unrelated.fake = function () { new Base(); }; // error
    return Unrelated;
}());
