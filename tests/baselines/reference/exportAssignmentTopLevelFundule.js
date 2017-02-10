//// [tests/cases/conformance/externalModules/exportAssignmentTopLevelFundule.ts] ////

//// [foo_0.ts]
function foo() {
	return "test";
}
module foo {
	export var answer = 42;
}
export = foo;

//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = foo();
}


//// [foo_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function foo() {
        return "test";
    }
    (function (foo) {
        foo.answer = 42;
    })(foo || (foo = {}));
    return foo;
});
//// [foo_1.js]
define(["require", "exports", "./foo_0"], function (require, exports, foo) {
    "use strict";
    exports.__esModule = true;
    if (foo.answer === 42) {
        var x = foo();
    }
});
