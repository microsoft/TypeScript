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
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = exports.x = void 0;
    exports.x = 1;
    exports.y = 2;
});
//// [t2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = void 0;
    exports.default = "hello";
    function foo() { }
    exports.foo = foo;
});
//// [t3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = exports.y = exports.x = void 0;
    var x = "x";
    exports.x = x;
    var y = "y";
    exports.y = y;
    var z = "z";
    exports.z = z;
});
//// [t4.js]
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
define(["require", "exports", "./t1", "./t2", "./t3"], function (require, exports, t1_1, t2_1, t3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(t1_1, exports);
    __exportStar(t2_1, exports);
    __exportStar(t3_1, exports);
});
//// [main.js]
define(["require", "exports", "./t4"], function (require, exports, t4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    t4_1.default;
    t4_1.x;
    t4_1.y;
    t4_1.z;
    t4_1.foo;
});
