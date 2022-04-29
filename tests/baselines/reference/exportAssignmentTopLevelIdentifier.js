//// [tests/cases/conformance/externalModules/exportAssignmentTopLevelIdentifier.ts] ////

//// [foo_0.ts]
module Foo {
	export var answer = 42;
}
export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){

}


//// [foo_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Foo;
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
    }
});
