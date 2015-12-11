//// [classExtendsClauseClassMergedWithModuleNotReferingConstructor.ts]
class A {
    a: number;
}
module A {
    export var v: string;
}

module Foo {
    var A = 1;
    class B extends A {
        b: string;
    }
}

//// [classExtendsClauseClassMergedWithModuleNotReferingConstructor.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
}());
var A;
(function (A) {
})(A || (A = {}));
var Foo;
(function (Foo) {
    var A = 1;
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    }(A));
})(Foo || (Foo = {}));
