//// [tests/cases/compiler/outExtensionInferFromModuleCJS.ts] ////

//// [input-1.ts]
export const ts = "foo";

//// [input-2.mts]
export const mts = "foo";

//// [input-3.cts]
export const cts = "foo";

//// [input-4.js]
export const js = "foo";

//// [input-5.mjs]
export const mjs = "foo";

//// [input-6.cjs]
export const cjs = "foo";


//// [input-1.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ts = void 0;
exports.ts = "foo";
//// [input-2.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mts = void 0;
exports.mts = "foo";
//// [input-3.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cts = void 0;
exports.cts = "foo";
//// [input-4.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.js = void 0;
exports.js = "foo";
//// [input-5.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mjs = void 0;
exports.mjs = "foo";
//// [input-6.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cjs = void 0;
exports.cjs = "foo";
