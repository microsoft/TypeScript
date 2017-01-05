//// [classExtendingNull.ts]
class C1 extends null { }
class C2 extends (null) { }


//// [classExtendingNull.js]
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
var C1 = (function (_super) {
    __extends(C1, _super);
    function C1() {
    }
    return C1;
}(null));
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
    }
    return C2;
}((null)));
