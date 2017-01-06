//// [classExtendsInterface.ts]
interface Comparable {}
class A extends Comparable {}
class B implements Comparable {}

interface Comparable2<T> {}
class A2<T> extends Comparable2<T> {}
class B2<T> implements Comparable2<T> {}


//// [classExtendsInterface.js]
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
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(Comparable));
var B = (function () {
    function B() {
    }
    return B;
}());
var A2 = (function (_super) {
    __extends(A2, _super);
    function A2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A2;
}(Comparable2));
var B2 = (function () {
    function B2() {
    }
    return B2;
}());
