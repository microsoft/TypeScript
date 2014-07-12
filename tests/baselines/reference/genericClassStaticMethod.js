//// [genericClassStaticMethod.ts]
// bug 755602: ICE compiling generic derived class with static method with same name

class Foo<T> {
    static getFoo() {
    }
}

class Bar<T> extends Foo<T> {
    static getFoo() {
    }
}


//// [genericClassStaticMethod.js]
// bug 755602: ICE compiling generic derived class with static method with same name
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
