//// [tests/cases/compiler/exportAssignNamedImport.ts] ////

//// [bar.ts]
export class Bar {
    name: string = "bar";
}
export function baz() {
    return "baz";
}

//// [reexport.ts]
import { Bar } from './bar';
export = Bar;


//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
exports.baz = baz;
class Bar {
    name = "bar";
}
exports.Bar = Bar;
function baz() {
    return "baz";
}
//// [reexport.js]
"use strict";
const bar_1 = require("./bar");
module.exports = bar_1.Bar;
