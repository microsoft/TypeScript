//// [tests/cases/compiler/commonSourceDir6.ts] ////

//// [bar.ts]
import {z} from "./foo";
export var x = z + z;

//// [foo.ts]
import {pi} from "../baz";
export var i = Math.sqrt(-1);
export var z = pi * pi;

//// [baz.ts]
import {x} from "a/bar";
import {i} from "a/foo";
export var pi = Math.PI;
export var y = x * i;

//// [concat.js]
define("tests/cases/compiler/baz", ["require", "exports", "tests/cases/compiler/a/bar", "tests/cases/compiler/a/foo"], function (require, exports, bar_1, foo_1) {
    "use strict";
    exports.pi = Math.PI;
    exports.y = bar_1.x * foo_1.i;
});
define("tests/cases/compiler/a/foo", ["require", "exports", "tests/cases/compiler/baz"], function (require, exports, baz_1) {
    "use strict";
    exports.i = Math.sqrt(-1);
    exports.z = baz_1.pi * baz_1.pi;
});
define("tests/cases/compiler/a/bar", ["require", "exports", "tests/cases/compiler/a/foo"], function (require, exports, foo_2) {
    "use strict";
    exports.x = foo_2.z + foo_2.z;
});
