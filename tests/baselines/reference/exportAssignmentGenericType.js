//// [foo_1.ts]
import foo = require("./foo_0");
var x = new foo<number>();
var y:number = x.test;


//// [foo_0.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
module.exports = Foo;
//// [foo_1.js]
var foo = require("./foo_0");
var x = new foo();
var y = x.test;
