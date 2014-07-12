//// [collisionRestParameterUnderscoreIUsage.js]
var _i = "This is what I'd expect to see";
var Foo = (function () {
    function Foo() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        console.log(_i); // This should result in error
    }
    return Foo;
})();
new Foo();
