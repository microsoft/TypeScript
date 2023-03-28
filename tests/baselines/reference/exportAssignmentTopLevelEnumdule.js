//// [tests/cases/conformance/externalModules/exportAssignmentTopLevelEnumdule.ts] ////

//// [foo_0.ts]
enum foo {
	red, green, blue
}
module foo {
	export var answer = 42;
}
export = foo;

//// [foo_1.ts]
import foo = require("./foo_0");
var color: foo;
if(color === foo.green){
	color = foo.answer;
}


//// [foo_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var foo;
    (function (foo) {
        foo[foo["red"] = 0] = "red";
        foo[foo["green"] = 1] = "green";
        foo[foo["blue"] = 2] = "blue";
    })(foo || (foo = {}));
    (function (foo) {
        foo.answer = 42;
    })(foo || (foo = {}));
    return foo;
});
//// [foo_1.js]
define(["require", "exports", "./foo_0"], function (require, exports, foo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var color;
    if (color === foo.green) {
        color = foo.answer;
    }
});
