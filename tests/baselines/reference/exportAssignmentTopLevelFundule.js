//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = foo();
}


//// [foo_0.js]
define(["require", "exports"], function(require, exports) {
    function foo() {
        return "test";
    }
    var foo;
    (function (foo) {
        foo.answer = 42;
    })(foo || (foo = {}));
    
    return foo;
});
//// [foo_1.js]
define(["require", "exports", "./foo_0"], function(require, exports, foo) {
    if (foo.answer === 42) {
        var x = foo();
    }
});
