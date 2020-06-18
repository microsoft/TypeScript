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
exports.y = exports.x = void 0;
exports.x = 1;
exports.y = 2;
//// [t2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.default = "hello";
function foo() { }
exports.foo = foo;
//// [t3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.y = exports.x = void 0;
var x = "x";
exports.x = x;
var y = "y";
exports.y = y;
var z = "z";
exports.z = z;
//// [t4.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./t1"), exports);
__exportStar(require("./t2"), exports);
__exportStar(require("./t3"), exports);
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t4_1 = require("./t4");
t4_1.default;
t4_1.x;
t4_1.y;
t4_1.z;
t4_1.foo;
