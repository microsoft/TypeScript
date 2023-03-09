//// [tests/cases/conformance/externalModules/importsImplicitlyReadonly.ts] ////

//// [a.ts]
export var x = 1;
var y = 1;
export { y };

//// [b.ts]
import { x, y } from "./a";
import * as a1 from "./a";
import a2 = require("./a");
const a3 = a1;

x = 1;     // Error
y = 1;     // Error
a1.x = 1;  // Error
a1.y = 1;  // Error
a2.x = 1;
a2.y = 1;
a3.x = 1;
a3.y = 1;

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 1;
var y = 1;
exports.y = y;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
var a1 = require("./a");
var a2 = require("./a");
var a3 = a1;
a_1.x = 1; // Error
a_1.y = 1; // Error
a1.x = 1; // Error
a1.y = 1; // Error
a2.x = 1;
a2.y = 1;
a3.x = 1;
a3.y = 1;
