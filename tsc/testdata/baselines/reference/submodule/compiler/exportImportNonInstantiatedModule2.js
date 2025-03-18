//// [tests/cases/compiler/exportImportNonInstantiatedModule2.ts] ////

//// [w1.ts]
export = Widget1
interface Widget1 { name: string; }

//// [exporter.ts]
export import w = require('./w1');

//// [consumer.ts]
import e = require('./exporter');

export function w(): e.w { // Should be OK
    return {name: 'value' };
}

//// [w1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = w;
function w() {
    return { name: 'value' };
}
