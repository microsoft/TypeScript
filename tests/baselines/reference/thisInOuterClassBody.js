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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
    __names(Foo.prototype, ["bar"]);
    Foo.y = this;
    return Foo;
}());
