//// [nonGenericClassExtendingGenericClassWithAny.ts]
class Foo<T> {
    t: T;
}

class Bar extends Foo<any> { } // Valid

//// [nonGenericClassExtendingGenericClassWithAny.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    return Bar;
}(Foo)); // Valid
