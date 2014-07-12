//// [foo_1.ts]
import foo = require("./foo_0");
var a: number = foo.a();
if(!!foo.b){
	foo.Test.answer = foo.c(42);
}

//// [foo_0.js]
var Foo;
(function (Foo) {
    function a() {
        return 5;
    }
    Foo.a = a;
    Foo.b = true;
})(Foo || (Foo = {}));
var Foo;
(function (Foo) {
    function c(a) {
        return a;
    }
    Foo.c = c;
    (function (Test) {
        Test.answer = 42;
    })(Foo.Test || (Foo.Test = {}));
    var Test = Foo.Test;
})(Foo || (Foo = {}));
module.exports = Foo;
//// [foo_1.js]
var foo = require("./foo_0");
var a = foo.a();
if (!!foo.b) {
    foo.Test.answer = foo.c(42);
}
