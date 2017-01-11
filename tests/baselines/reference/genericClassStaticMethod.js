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
var Foo = (function () {
    function Foo() {
    }
    Foo.getFoo = function () {
    };
    return Foo;
}());
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bar.getFoo = function () {
    };
    return Bar;
}(Foo));
