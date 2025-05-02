//// [tests/cases/conformance/es6/modules/exportSpellingSuggestion.ts] ////

//// [a.ts]
export function assertNever(x: never, msg: string) {
    throw new Error("Unexpected " + msg);
}

//// [b.ts]
import { assertNevar } from "./a";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = assertNever;
function assertNever(x, msg) {
    throw new Error("Unexpected " + msg);
}
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
