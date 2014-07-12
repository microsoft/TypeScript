//// [collisionThisExpressionAndNameResolution.js]
var console;
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.x = function () {
        var _this = 10;
        function inner() {
            var _this = this;
            console.log(_this); // Error as this doesnt not resolve to user defined _this
            return function (x) {
                return _this;
            };
        }
    };
    return Foo;
})();
