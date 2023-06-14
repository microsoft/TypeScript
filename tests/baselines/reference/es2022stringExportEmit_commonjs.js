//// [tests/cases/compiler/es2022stringExportEmit_commonjs.ts] ////

//// [mod.ts]
export let x = 1;
x = 2;
export { x as "y", x as ' "hello" ' }

//// [index.ts]
import { y, ' "hello" ' as Hello } from './mod'
console.log(y, Hello)
export * as " mod " from "./mod"
export {
    x as y,
    y as y2,
    x as " reexport x ",
    "x" as " reexport x2 ",
    ' "hello" ' as Hello
} from './mod'


//// [mod.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[" \"hello\" "] = exports["y"] = exports.x = void 0;
exports.x = 1;
exports["y"] = exports.x;
exports[" \"hello\" "] = exports.x;
exports[" \"hello\" "] = exports["y"] = exports.x = 2;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = exports[" reexport x2 "] = exports[" reexport x "] = exports.y2 = exports.y = exports[" mod "] = void 0;
var mod_1 = require("./mod");
console.log(mod_1.y, mod_1[" \"hello\" "]);
exports[" mod "] = require("./mod");
var mod_2 = require("./mod");
Object.defineProperty(exports, "y", { enumerable: true, get: function () { return mod_2.x; } });
Object.defineProperty(exports, "y2", { enumerable: true, get: function () { return mod_2.y; } });
Object.defineProperty(exports, " reexport x ", { enumerable: true, get: function () { return mod_2.x; } });
Object.defineProperty(exports, " reexport x2 ", { enumerable: true, get: function () { return mod_2["x"]; } });
Object.defineProperty(exports, "Hello", { enumerable: true, get: function () { return mod_2[' "hello" ']; } });
