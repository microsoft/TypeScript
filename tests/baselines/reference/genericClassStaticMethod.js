//// [genericClassStaticMethod.ts]
class Foo<T> {
    static getFoo() {
    }
}

class Bar<T> extends Foo<T> {
    static getFoo() {
    }
}


//// [genericClassStaticMethod.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Foo = (function () {
    function Foo() {
    }
    Foo.getFoo = function () {
    };
    return Foo;
})();
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    Bar.getFoo = function () {
    };
    return Bar;
})(Foo);
