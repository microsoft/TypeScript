//// [tests/cases/compiler/inferredIndexerOnNamespaceImport.ts] ////

//// [foo.ts]
export const x = 3;
export const y = 5;

//// [bar.ts]
import * as foo from "./foo";

function f(map: { [k: string]: number }) {
  // ...
}

f(foo);

//// [foo.js]
"use strict";
exports.__esModule = true;
exports.x = 3;
exports.y = 5;
//// [bar.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var foo = __importStar(require("./foo"));
function f(map) {
    // ...
}
f(foo);
