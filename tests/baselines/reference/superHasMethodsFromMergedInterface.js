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
    var proto_1 = C.prototype;
    proto_1.m1 = function () { };
    return C;
}());
var Sub = (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var proto_2 = Sub.prototype;
    proto_2.m3 = function () {
        _super.prototype.m2.call(this);
    };
    return Sub;
}(C));
