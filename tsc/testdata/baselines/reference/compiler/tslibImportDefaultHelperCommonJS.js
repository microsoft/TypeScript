//// [tests/cases/compiler/tslibImportDefaultHelperCommonJS.ts] ////

//// [package.json]
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

//// [tslib.d.ts]
export const notAHelper: any;

//// [tslib.js]
module.exports.notAHelper = 3;

//// [main.ts]
import greet from "./dependency";

export const message = greet("world");

//// [combined.ts]
import greet, * as dependency from "./dependency";

export const message = greet("world");
export const namespaceMessage = dependency.default("namespace");

//// [dependency.ts]
export default function greet(name: string) {
    return `hello, ${name}`;
}


//// [dependency.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = greet;
function greet(name) {
    return `hello, ${name}`;
}
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const tslib_1 = require("tslib");
const dependency_1 = tslib_1.__importDefault(require("./dependency"));
exports.message = (0, dependency_1.default)("world");
//// [combined.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namespaceMessage = exports.message = void 0;
const tslib_1 = require("tslib");
const dependency_1 = tslib_1.__importStar(require("./dependency")), dependency = dependency_1;
exports.message = (0, dependency_1.default)("world");
exports.namespaceMessage = dependency.default("namespace");
