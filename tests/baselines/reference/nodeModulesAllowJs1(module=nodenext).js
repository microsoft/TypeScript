//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJs1.ts] ////

//// [index.js]
// cjs format file
const x = 1;
export {x};
//// [index.cjs]
// cjs format file
const x = 1;
export {x};
//// [index.mjs]
// esm format file
const x = 1;
export {x};
//// [index.js]
// cjs format file
const x = 1;
export {x};
//// [index.cjs]
// cjs format file
const x = 1;
export {x};
//// [index.mjs]
// esm format file
const x = 1;
export {x};
//// [index.js]
// esm format file
const x = 1;
export {x};
//// [index.cjs]
// cjs format file
const x = 1;
export {x};
//// [index.mjs]
// esm format file
const x = 1;
export {x};
//// [index.js]
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// esm format file
const x = 1;
export {x};
//// [index.cjs]
// ESM format imports below should error
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// cjs format file
const x = 1;
export {x};
//// [index.mjs]
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// esm format file
const x = 1;
export {x};
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}
//// [package.json]
{
}
//// [package.json]
{
    "type": "module"
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = 1;
exports.x = x;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = 1;
exports.x = x;
//// [index.mjs]
// esm format file
const x = 1;
export { x };
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = 1;
exports.x = x;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = 1;
exports.x = x;
//// [index.mjs]
// esm format file
const x = 1;
export { x };
//// [index.js]
// esm format file
const x = 1;
export { x };
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
const x = 1;
exports.x = x;
//// [index.mjs]
// esm format file
const x = 1;
export { x };
//// [index.cjs]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// ESM format imports below should error
const m1 = __importStar(require("./index.js"));
const m2 = __importStar(require("./index.mjs"));
const m3 = __importStar(require("./index.cjs"));
const m4 = __importStar(require("./subfolder/index.js"));
const m5 = __importStar(require("./subfolder/index.mjs"));
const m6 = __importStar(require("./subfolder/index.cjs"));
const m7 = __importStar(require("./subfolder2/index.js"));
const m8 = __importStar(require("./subfolder2/index.mjs"));
const m9 = __importStar(require("./subfolder2/index.cjs"));
const m10 = __importStar(require("./subfolder2/another/index.js"));
const m11 = __importStar(require("./subfolder2/another/index.mjs"));
const m12 = __importStar(require("./subfolder2/another/index.cjs"));
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// cjs format file
const x = 1;
exports.x = x;
//// [index.mjs]
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// esm format file
const x = 1;
export { x };
//// [index.js]
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// esm format file
const x = 1;
export { x };


//// [index.d.ts]
export const x: 1;
//// [index.d.cts]
declare const x = 1;
export { x };
//// [index.d.mts]
declare const x = 1;
export { x };
//// [index.d.ts]
export const x: 1;
//// [index.d.cts]
declare const x = 1;
export { x };
//// [index.d.mts]
declare const x = 1;
export { x };
//// [index.d.ts]
export const x: 1;
//// [index.d.cts]
declare const x = 1;
export { x };
//// [index.d.mts]
declare const x = 1;
export { x };
//// [index.d.cts]
declare const x = 1;
export { x };
//// [index.d.mts]
declare const x = 1;
export { x };
//// [index.d.ts]
export const x: 1;
