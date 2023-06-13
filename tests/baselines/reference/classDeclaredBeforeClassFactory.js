//// [tests/cases/compiler/classDeclaredBeforeClassFactory.ts] ////

//// [classDeclaredBeforeClassFactory.ts]
// Should be OK due to hoisting
class Derived extends makeBaseClass() {}

function makeBaseClass() {
    return class Base {};
}


//// [classDeclaredBeforeClassFactory.js]
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
// Should be OK due to hoisting
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(makeBaseClass()));
function makeBaseClass() {
    return /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
}
