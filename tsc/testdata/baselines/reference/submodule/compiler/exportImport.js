//// [tests/cases/compiler/exportImport.ts] ////

//// [w1.ts]
export = Widget1
class Widget1 { name = 'one'; }

//// [exporter.ts]
export import w = require('./w1');

//// [consumer.ts]
import e = require('./exporter');

export function w(): e.w { // Should be OK
    return new e.w();
}

//// [w1.js]
"use strict";
class Widget1 {
    name = 'one';
}
module.exports = Widget1;
//// [exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = require("./w1");
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = w;
const e = require("./exporter");
function w() {
    return new e.w();
}
