//// [classDeclaredBeforeClassFactory.ts]
// Should be OK due to hoisting
class Derived extends makeBaseClass() {}

function makeBaseClass() {
    return class Base {};
}


//// [classDeclaredBeforeClassFactory.js]
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
// Should be OK due to hoisting
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(makeBaseClass()));
function makeBaseClass() {
    return (function () {
        function Base() {
        }
        return Base;
    }());
}
