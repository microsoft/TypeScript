//// [nonGenericClassExtendingGenericClassWithAny.ts]
class Foo<T> {
    t: T;
}

class Bar extends Foo<any> { } // Valid

//// [nonGenericClassExtendingGenericClassWithAny.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    return Bar;
})(Foo); // Valid
