//// [classAbstractInAModule.ts]
module M {
    export abstract class A {}
    export class B extends A {}
}

new M.A;
new M.B;

//// [classAbstractInAModule.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var M;
(function (M) {
    var A = (function () {
        function A() {
        }
        return A;
    }());
    M.A = A;
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    }(A));
    M.B = B;
})(M || (M = {}));
new M.A;
new M.B;
