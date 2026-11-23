//// [tests/cases/compiler/rewriteRelativeImportExtensionsDynamicImportCjs.ts] ////

//// [index.cts]
import { getSpecifier } from "./specifier.cjs";

import(getSpecifier());
import(`./target.ts`);

//// [specifier.cts]
export function getSpecifier() {
    return "./target.ts";
}

//// [target.ts]
export {};


//// [specifier.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecifier = getSpecifier;
function getSpecifier() {
    return "./target.ts";
}
//// [target.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const specifier_cjs_1 = require("./specifier.cjs");
import((0, specifier_cjs_1.getSpecifier)());
import(`./target.js`);
