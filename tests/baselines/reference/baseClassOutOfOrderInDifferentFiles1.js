//// [tests/cases/compiler/baseClassOutOfOrderInDifferentFiles1.ts] ////

//// [file1.ts]
// Different files - no --out
class B extends A {
}

//// [file2.ts]
class A {
}

//// [file1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Different files - no --out
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
//// [file2.js]
var A = (function () {
    function A() {
    }
    return A;
})();
