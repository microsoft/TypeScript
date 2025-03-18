//// [tests/cases/compiler/tsconfigMapOptionsAreCaseInsensitive.ts] ////

//// [other.ts]
export default 42;

//// [index.ts]
import Answer from "./other.js";
const x = 10 + Answer;
export {
    x
};

//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 42;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const other_js_1 = require("./other.js");
const x = 10 + other_js_1.default;
exports.x = x;
