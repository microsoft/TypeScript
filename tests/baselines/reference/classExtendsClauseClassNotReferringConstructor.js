//// [classExtendsClauseClassNotReferringConstructor.ts]
class A { a: number; }
module Foo {
    var A = 1;
    class B extends A { b: string; }
}


//// [classExtendsClauseClassNotReferringConstructor.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
})();
var Foo;
(function (Foo) {
    var A = 1;
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(A);
})(Foo || (Foo = {}));
