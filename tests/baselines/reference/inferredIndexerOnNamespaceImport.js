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
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 3;
exports.y = 5;
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo = require("./foo");
function f(map) {
    // ...
}
f(foo);
