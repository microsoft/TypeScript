//// [tests/cases/compiler/allowSyntheticDefaultImports1.ts] ////

//// [a.ts]
import Namespace from "./b";
export var x = new Namespace.Foo();

//// [b.ts]
export class Foo {
	member: string;
}


//// [b.js]
"use strict";
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
exports.Foo = Foo;
//// [a.js]
"use strict";
var b_1 = require("./b");
exports.x = new b_1["default"].Foo();
