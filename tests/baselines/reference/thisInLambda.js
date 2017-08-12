//// [thisInLambda.ts]
class Foo {
    x = "hello";
    bar() {
        this.x; // 'this' is type 'Foo'
        var f = () => this.x; // 'this' should be type 'Foo' as well
    }
}

function myFn(a:any) { }
class myCls {
    constructor () {
        myFn(() => {
            myFn(() => {
                var x = this;
            });
        });
    }
}

//// [thisInLambda.js]
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
        this.x = "hello";
    }
    Foo.prototype.bar = function () {
        var _this = this;
        this.x; // 'this' is type 'Foo'
        var f = function () { return _this.x; }; // 'this' should be type 'Foo' as well
    };
    __names(Foo.prototype, ["bar"]);
    return Foo;
}());
function myFn(a) { }
var myCls = (function () {
    function myCls() {
        var _this = this;
        myFn(function () {
            myFn(function () {
                var x = _this;
            });
        });
    }
    return myCls;
}());
