//// [typeValueConflict1.ts]
module M1 {
 export class A {
 }
}
module M2 {
 var M1 = 0;
 // Should error.  M1 should bind to the variable, not to the module.
 class B extends M1.A {
 }
}


//// [typeValueConflict1.js]
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
var M1;
(function (M1) {
    var A = (function () {
        function A() {
        }
        return A;
    }());
    M1.A = A;
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var M1 = 0;
    // Should error.  M1 should bind to the variable, not to the module.
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(M1.A));
})(M2 || (M2 = {}));
