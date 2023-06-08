//// [tests/cases/compiler/thisInOuterClassBody.ts] ////

//// [thisInOuterClassBody.ts]
class Foo {

    x = this;

    static y = this;

    bar() {
 
        this.x; // 'this' is type 'Foo'
 
        var f = () => this.x; // 'this' should be type 'Foo' as well
        var p = this.y;
        return this;
    }

    static bar2() {
        var a = this.y;
        var b = this.x;
    }
}

//// [thisInOuterClassBody.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.x = this;
    }
    Foo.prototype.bar = function () {
        var _this = this;
        this.x; // 'this' is type 'Foo'
        var f = function () { return _this.x; }; // 'this' should be type 'Foo' as well
        var p = this.y;
        return this;
    };
    Foo.bar2 = function () {
        var a = this.y;
        var b = this.x;
    };
    var _a;
    _a = Foo;
    Foo.y = _a;
    return Foo;
}());
