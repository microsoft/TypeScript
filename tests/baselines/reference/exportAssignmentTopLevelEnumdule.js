//// [foo_1.ts]
import foo = require("./foo_0");
var color: foo;
if(color === foo.green){
	color = foo.answer;
}


//// [foo_0.js]
define(["require", "exports"], function(require, exports) {
    var foo;
    (function (foo) {
        foo[foo["red"] = 0] = "red";
        foo[foo["green"] = 1] = "green";
        foo[foo["blue"] = 2] = "blue";
    })(foo || (foo = {}));
    var foo;
    (function (foo) {
        foo.answer = 42;
    })(foo || (foo = {}));
    
    return foo;
});
//// [foo_1.js]
define(["require", "exports", "./foo_0"], function(require, exports, foo) {
    var color;
    if (color === 1 /* green */) {
        color = foo.answer;
    }
});
