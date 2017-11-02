//// [tests/cases/conformance/dynamicImport/importCallExpressionWithTypeArgument.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
"use strict"
var p1 = import<Promise<any>>("./0");  // error
var p2 = import<>("./0");  // error

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo() { return "foo"; }
exports.foo = foo;
//// [1.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var p1 = Promise.resolve().then(() => __importStar(require("./0"))); // error
var p2 = Promise.resolve().then(() => __importStar(require("./0"))); // error
