//// [tests/cases/conformance/externalModules/exportAssignmentCircularModules.ts] ////

//// [foo_0.ts]
import foo1 = require('./foo_1');
module Foo {
	export var x = foo1.x;
}
export = Foo;

//// [foo_1.ts]
import foo2 = require("./foo_2");
module Foo {
	export var x = foo2.x;
}
export = Foo;

//// [foo_2.ts]
import foo0 = require("./foo_0");
module Foo {
	export var x = foo0.x;
}
export = Foo;


//// [foo_1.js]
"use strict";
const foo2 = require("./foo_2");
var Foo;
(function (Foo) {
    Foo.x = foo2.x;
})(Foo || (Foo = {}));
module.exports = Foo;
//// [foo_0.js]
"use strict";
const foo1 = require("./foo_1");
var Foo;
(function (Foo) {
    Foo.x = foo1.x;
})(Foo || (Foo = {}));
module.exports = Foo;
//// [foo_2.js]
"use strict";
const foo0 = require("./foo_0");
var Foo;
(function (Foo) {
    Foo.x = foo0.x;
})(Foo || (Foo = {}));
module.exports = Foo;
