//// [superHasMethodsFromMergedInterface.ts]
class C { m1() { } }
interface C { m2(): void }
class Sub extends C {
    m3() {
        super.m2();
    }
}


//// [superHasMethodsFromMergedInterface.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.m1 = function () { };
    return C;
}());
var Sub = (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub.prototype.m3 = function () {
        _super.prototype.m2.call(this);
    };
    return Sub;
}(C));
