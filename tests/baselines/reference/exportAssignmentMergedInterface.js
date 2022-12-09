//// [tests/cases/conformance/externalModules/exportAssignmentMergedInterface.ts] ////

//// [foo_0.ts]
interface Foo {
	(a: string): void;
	b: string;
}
interface Foo {
	(a: number): number;
	c: boolean;
	d: {x: number; y: number};
}
export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
var x: foo;
x("test");
x(42);
var y: string = x.b;
if(!!x.c){ }
var z = {x: 1, y: 2};
z = x.d;

//// [foo_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [foo_1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var x;
    x("test");
    x(42);
    var y = x.b;
    if (!!x.c) { }
    var z = { x: 1, y: 2 };
    z = x.d;
});
