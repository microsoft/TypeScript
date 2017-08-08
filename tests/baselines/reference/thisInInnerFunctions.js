//// [thisInInnerFunctions.ts]
class Foo {
    x = "hello";
    bar() {
        function inner() {
            this.y = "hi"; // 'this' should be not type to 'Foo' either
            var f = () => this.y;  // 'this' should be not type to 'Foo' either
        }
    }
}

function test() {
    var x = () => {
        (() => this)();
        this;
    };
}


//// [thisInInnerFunctions.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
        function inner() {
            var _this = this;
            this.y = "hi"; // 'this' should be not type to 'Foo' either
            var f = function () { return _this.y; }; // 'this' should be not type to 'Foo' either
        }
    };
    __names(Foo.prototype, ["bar"]);
    return Foo;
}());
function test() {
    var _this = this;
    var x = function () {
        (function () { return _this; })();
        _this;
    };
}
