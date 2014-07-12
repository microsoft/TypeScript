//// [foo_0.js]
var Foo = (function () {
    function Foo(x) {
    }
    return Foo;
})();

module.exports = Foo;
//// [foo_1.js]
var foo = require("./foo_0");
var x = new foo(true);
var y = new foo({ a: "test", b: 42 });
var z = y.test.b;
