//// [classExtendsInterface.ts]
interface Comparable {}
class A extends Comparable {}
class B implements Comparable {}

interface Comparable2<T> {}
class A2<T> extends Comparable2<T> {}
class B2<T> implements Comparable2<T> {}


//// [classExtendsInterface.js]
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
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(Comparable));
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var A2 = /** @class */ (function (_super) {
    __extends(A2, _super);
    function A2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A2;
}(Comparable2));
var B2 = /** @class */ (function () {
    function B2() {
    }
    return B2;
}());
