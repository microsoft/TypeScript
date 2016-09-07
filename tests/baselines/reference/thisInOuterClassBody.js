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
var Foo = (function () {
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
    return Foo;
}());
Foo.y = this;
