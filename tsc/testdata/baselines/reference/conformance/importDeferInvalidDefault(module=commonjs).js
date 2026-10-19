//// [tests/cases/conformance/importDefer/importDeferInvalidDefault.ts] ////

//// [a.ts]
export default function foo() {
    console.log("foo from a");
}

//// [b.ts]
import defer foo from "./a";

foo();

import defer "./a.js";
import defer "./a.js" with { type: "json" };

//// [c.js]
// @ts-check
import defer "./a.js";
import defer "./a.js" with { type: "json" };

//// [d.js]
import defer "./a.js";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo;
function foo() {
    console.log("foo from a");
}
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
(0, a_1.default)();
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-check
const a_js_1 = require("./a.js");
const a_js_2 = require("./a.js");
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_js_1 = require("./a.js");
