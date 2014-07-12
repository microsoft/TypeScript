//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = new foo();
}


//// [foo_0.js]
define(["require", "exports"], function(require, exports) {
    var Foo = (function () {
        function Foo() {
            this.test = "test";
        }
        return Foo;
    })();
    var Foo;
    (function (Foo) {
        Foo.answer = 42;
    })(Foo || (Foo = {}));
    
    return Foo;
});
//// [foo_1.js]
define(["require", "exports", "./foo_0"], function(require, exports, foo) {
    if (foo.answer === 42) {
        var x = new foo();
    }
});
