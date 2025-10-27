//// [tests/cases/compiler/exportDefaultStripsFreshness.ts] ////

//// [items.ts]
export default {
    foob: "a"
}

export const q = {
    foob: "b"
}
//// [index.ts]
import B, {q} from "./items";

interface IFoo {
    foo: string;
}

function nFoo(x: IFoo) {}


nFoo(q); // for comparison

nFoo(B);


//// [items.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q = void 0;
exports.default = {
    foob: "a"
};
exports.q = {
    foob: "b"
};
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var items_1 = require("./items");
function nFoo(x) { }
nFoo(items_1.q); // for comparison
nFoo(items_1.default);
