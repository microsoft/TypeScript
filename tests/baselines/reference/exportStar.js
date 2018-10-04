//// [tests/cases/conformance/es6/modules/exportStar.ts] ////

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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = 1;
exports.y = 2;
//// [t2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "hello";
function foo() { }
exports.foo = foo;
//// [t3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = "x";
exports.x = x;
var y = "y";
exports.y = y;
var z = "z";
exports.z = z;
//// [t4.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./t1"));
__export(require("./t2"));
__export(require("./t3"));
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t4_1 = require("./t4");
t4_1.default;
t4_1.x;
t4_1.y;
t4_1.z;
t4_1.foo;
