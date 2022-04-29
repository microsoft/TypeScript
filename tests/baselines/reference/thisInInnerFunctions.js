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
var Foo = /** @class */ (function () {
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
    return Foo;
}());
function test() {
    var _this = this;
    var x = function () {
        (function () { return _this; })();
        _this;
    };
}
