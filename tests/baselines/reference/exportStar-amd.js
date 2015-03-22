//// [tests/cases/conformance/es6/modules/exportStar-amd.ts] ////

//// [t1.ts]

export var x = 1;
export var y = 2;

//// [t2.ts]
export default "hello";
export function foo() { }

//// [t3.ts]
var x = "x";
var y = "y";
var z = "z";
export { x, y, z };

//// [t4.ts]
export * from "./t1";
export * from "./t2";
export * from "./t3";

//// [main.ts]
import hello, { x, y, z, foo } from "./t4";
hello;
x;
y;
z;
foo;


//// [t1.js]
define(["require", "exports"], function (require, exports) {
    exports.x = 1;
    exports.y = 2;
});
//// [t2.js]
define(["require", "exports"], function (require, exports) {
    exports.default = "hello";
    function foo() {
    }
    exports.foo = foo;
});
//// [t3.js]
define(["require", "exports"], function (require, exports) {
    var x = "x";
    exports.x = x;
    var y = "y";
    exports.y = y;
    var z = "z";
    exports.z = z;
});
//// [t4.js]
define(["require", "exports", "./t1", "./t2", "./t3"], function (require, exports, _t1, _t2, _t3) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(_t1);
    __export(_t2);
    __export(_t3);
});
//// [main.js]
define(["require", "exports", "./t4"], function (require, exports, _t4) {
    _t4.default;
    _t4.x;
    _t4.y;
    _t4.z;
    _t4.foo;
});
