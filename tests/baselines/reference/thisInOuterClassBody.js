//// [thisInOuterClassBody.js]
var Foo = (function () {
    function Foo() {
        this.x = this;
    }
    Foo.prototype.bar = function () {
        var _this = this;
        this.x; // 'this' is type 'Foo'

        var f = function () {
            return _this.x;
        };
        var p = this.y;
        return this;
    };

    Foo.bar2 = function () {
        var a = this.y;
        var b = this.x;
    };
    Foo.y = this;
    return Foo;
})();
