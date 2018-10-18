//// [tests/cases/conformance/externalModules/exportAssignmentTopLevelClodule.ts] ////

//// [foo_0.ts]
class Foo {
	test = "test";
}
module Foo {
	export var answer = 42;
}
export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = new foo();
}


//// [foo_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Foo = /** @class */ (function () {
        function Foo() {
            this.test = "test";
        }
        return Foo;
    }());
    (function (Foo) {
        Foo.answer = 42;
    })(Foo || (Foo = {}));
    return Foo;
});
//// [foo_1.js]
define(["require", "exports", "./foo_0"], function (require, exports, foo) {
    "use strict";
    exports.__esModule = true;
    if (foo.answer === 42) {
        var x = new foo();
    }
});
