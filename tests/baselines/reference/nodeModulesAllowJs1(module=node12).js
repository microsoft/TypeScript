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
// The next ones shouldn't all work - esm format files have no index resolution or extension resolution
import * as m13 from "./";
import * as m14 from "./index";
import * as m15 from "./subfolder";
import * as m16 from "./subfolder/";
import * as m17 from "./subfolder/index";
import * as m18 from "./subfolder2";
import * as m19 from "./subfolder2/";
import * as m20 from "./subfolder2/index";
import * as m21 from "./subfolder2/another";
import * as m22 from "./subfolder2/another/";
import * as m23 from "./subfolder2/another/index";
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
void m13;
void m14;
void m15;
void m16;
void m17;
void m18;
void m19;
void m20;
void m21;
void m22;
void m23;

// These should _mostly_ work - `import = require` always desugars to require calls, which do have extension and index resolution (but can't load anything that resolves to esm!)
import m24 = require("./");
import m25 = require("./index");
import m26 = require("./subfolder");
import m27 = require("./subfolder/");
import m28 = require("./subfolder/index");
import m29 = require("./subfolder2");
import m30 = require("./subfolder2/");
import m31 = require("./subfolder2/index");
import m32 = require("./subfolder2/another");
import m33 = require("./subfolder2/another/");
import m34 = require("./subfolder2/another/index");
void m24;
void m25;
void m26;
void m27;
void m28;
void m29;
void m30;
void m31;
void m32;
void m33;
void m34;

// These shouldn't work - dynamic `import()` always uses the esm resolver, which does not have extension resolution
const _m35 = import("./");
const _m36 = import("./index");
const _m37 = import("./subfolder");
const _m38 = import("./subfolder/");
const _m39 = import("./subfolder/index");
const _m40 = import("./subfolder2");
const _m41 = import("./subfolder2/");
const _m42 = import("./subfolder2/index");
const _m43 = import("./subfolder2/another");
const _m44 = import("./subfolder2/another/");
const _m45 = import("./subfolder2/another/index");
// esm format file
const x = 1;
export {x};
//// [index.cjs]
// ESM-format imports below should issue errors
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
// The next ones should _mostly_ work - cjs format files have index resolution and extension resolution (except for those which resolve to an esm format file)
import * as m13 from "./";
import * as m14 from "./index";
import * as m15 from "./subfolder";
import * as m16 from "./subfolder/";
import * as m17 from "./subfolder/index";
import * as m18 from "./subfolder2";
import * as m19 from "./subfolder2/";
import * as m20 from "./subfolder2/index";
import * as m21 from "./subfolder2/another";
import * as m22 from "./subfolder2/another/";
import * as m23 from "./subfolder2/another/index";
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
void m13;
void m14;
void m15;
void m16;
void m17;
void m18;
void m19;
void m20;
void m21;
void m22;
void m23;

// These should _mostly_ work - `import = require` always desugars to require calls, which do have extension and index resolution (but can't load anything that resolves to esm!)
import m24 = require("./");
import m25 = require("./index");
import m26 = require("./subfolder");
import m27 = require("./subfolder/");
import m28 = require("./subfolder/index");
import m29 = require("./subfolder2");
import m30 = require("./subfolder2/");
import m31 = require("./subfolder2/index");
import m32 = require("./subfolder2/another");
import m33 = require("./subfolder2/another/");
import m34 = require("./subfolder2/another/index");
void m24;
void m25;
void m26;
void m27;
void m28;
void m29;
void m30;
void m31;
void m32;
void m33;
void m34;

// These shouldn't work - dynamic `import()` always uses the esm resolver, which does not have extension resolution
const _m35 = import("./");
const _m36 = import("./index");
const _m37 = import("./subfolder");
const _m38 = import("./subfolder/");
const _m39 = import("./subfolder/index");
const _m40 = import("./subfolder2");
const _m41 = import("./subfolder2/");
const _m42 = import("./subfolder2/index");
const _m43 = import("./subfolder2/another");
const _m44 = import("./subfolder2/another/");
const _m45 = import("./subfolder2/another/index");
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
// The next ones should all fail - esm format files have no index resolution or extension resolution
import * as m13 from "./";
import * as m14 from "./index";
import * as m15 from "./subfolder";
import * as m16 from "./subfolder/";
import * as m17 from "./subfolder/index";
import * as m18 from "./subfolder2";
import * as m19 from "./subfolder2/";
import * as m20 from "./subfolder2/index";
import * as m21 from "./subfolder2/another";
import * as m22 from "./subfolder2/another/";
import * as m23 from "./subfolder2/another/index";
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
void m13;
void m14;
void m15;
void m16;
void m17;
void m18;
void m19;
void m20;
void m21;
void m22;
void m23;

// These should _mostly_ work - `import = require` always desugars to require calls, which do have extension and index resolution (but can't load anything that resolves to esm!)
import m24 = require("./");
import m25 = require("./index");
import m26 = require("./subfolder");
import m27 = require("./subfolder/");
import m28 = require("./subfolder/index");
import m29 = require("./subfolder2");
import m30 = require("./subfolder2/");
import m31 = require("./subfolder2/index");
import m32 = require("./subfolder2/another");
import m33 = require("./subfolder2/another/");
import m34 = require("./subfolder2/another/index");
void m24;
void m25;
void m26;
void m27;
void m28;
void m29;
void m30;
void m31;
void m32;
void m33;
void m34;

// These shouldn't work - dynamic `import()` always uses the esm resolver, which does not have extension resolution
const _m35 = import("./");
const _m36 = import("./index");
const _m37 = import("./subfolder");
const _m38 = import("./subfolder/");
const _m39 = import("./subfolder/index");
const _m40 = import("./subfolder2");
const _m41 = import("./subfolder2/");
const _m42 = import("./subfolder2/index");
const _m43 = import("./subfolder2/another");
const _m44 = import("./subfolder2/another/");
const _m45 = import("./subfolder2/another/index");

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
// ESM-format imports below should issue errors
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
// The next ones should _mostly_ work - cjs format files have index resolution and extension resolution (except for those which resolve to an esm format file)
const m13 = __importStar(require("./"));
const m14 = __importStar(require("./index"));
const m15 = __importStar(require("./subfolder"));
const m16 = __importStar(require("./subfolder/"));
const m17 = __importStar(require("./subfolder/index"));
const m18 = __importStar(require("./subfolder2"));
const m19 = __importStar(require("./subfolder2/"));
const m20 = __importStar(require("./subfolder2/index"));
const m21 = __importStar(require("./subfolder2/another"));
const m22 = __importStar(require("./subfolder2/another/"));
const m23 = __importStar(require("./subfolder2/another/index"));
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
void m13;
void m14;
void m15;
void m16;
void m17;
void m18;
void m19;
void m20;
void m21;
void m22;
void m23;
// These should _mostly_ work - `import = require` always desugars to require calls, which do have extension and index resolution (but can't load anything that resolves to esm!)
const m24 = require("./");
const m25 = require("./index");
const m26 = require("./subfolder");
const m27 = require("./subfolder/");
const m28 = require("./subfolder/index");
const m29 = require("./subfolder2");
const m30 = require("./subfolder2/");
const m31 = require("./subfolder2/index");
const m32 = require("./subfolder2/another");
const m33 = require("./subfolder2/another/");
const m34 = require("./subfolder2/another/index");
void m24;
void m25;
void m26;
void m27;
void m28;
void m29;
void m30;
void m31;
void m32;
void m33;
void m34;
// These shouldn't work - dynamic `import()` always uses the esm resolver, which does not have extension resolution
const _m35 = import("./");
const _m36 = import("./index");
const _m37 = import("./subfolder");
const _m38 = import("./subfolder/");
const _m39 = import("./subfolder/index");
const _m40 = import("./subfolder2");
const _m41 = import("./subfolder2/");
const _m42 = import("./subfolder2/index");
const _m43 = import("./subfolder2/another");
const _m44 = import("./subfolder2/another/");
const _m45 = import("./subfolder2/another/index");
// cjs format file
const x = 1;
exports.x = x;
//// [index.mjs]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
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
// The next ones should all fail - esm format files have no index resolution or extension resolution
import * as m13 from "./";
import * as m14 from "./index";
import * as m15 from "./subfolder";
import * as m16 from "./subfolder/";
import * as m17 from "./subfolder/index";
import * as m18 from "./subfolder2";
import * as m19 from "./subfolder2/";
import * as m20 from "./subfolder2/index";
import * as m21 from "./subfolder2/another";
import * as m22 from "./subfolder2/another/";
import * as m23 from "./subfolder2/another/index";
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
void m13;
void m14;
void m15;
void m16;
void m17;
void m18;
void m19;
void m20;
void m21;
void m22;
void m23;
// These should _mostly_ work - `import = require` always desugars to require calls, which do have extension and index resolution (but can't load anything that resolves to esm!)
const m24 = __require("./");
const m25 = __require("./index");
const m26 = __require("./subfolder");
const m27 = __require("./subfolder/");
const m28 = __require("./subfolder/index");
const m29 = __require("./subfolder2");
const m30 = __require("./subfolder2/");
const m31 = __require("./subfolder2/index");
const m32 = __require("./subfolder2/another");
const m33 = __require("./subfolder2/another/");
const m34 = __require("./subfolder2/another/index");
void m24;
void m25;
void m26;
void m27;
void m28;
void m29;
void m30;
void m31;
void m32;
void m33;
void m34;
// These shouldn't work - dynamic `import()` always uses the esm resolver, which does not have extension resolution
const _m35 = import("./");
const _m36 = import("./index");
const _m37 = import("./subfolder");
const _m38 = import("./subfolder/");
const _m39 = import("./subfolder/index");
const _m40 = import("./subfolder2");
const _m41 = import("./subfolder2/");
const _m42 = import("./subfolder2/index");
const _m43 = import("./subfolder2/another");
const _m44 = import("./subfolder2/another/");
const _m45 = import("./subfolder2/another/index");
// esm format file
const x = 1;
export { x };
//// [index.js]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
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
// The next ones shouldn't all work - esm format files have no index resolution or extension resolution
import * as m13 from "./";
import * as m14 from "./index";
import * as m15 from "./subfolder";
import * as m16 from "./subfolder/";
import * as m17 from "./subfolder/index";
import * as m18 from "./subfolder2";
import * as m19 from "./subfolder2/";
import * as m20 from "./subfolder2/index";
import * as m21 from "./subfolder2/another";
import * as m22 from "./subfolder2/another/";
import * as m23 from "./subfolder2/another/index";
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
void m13;
void m14;
void m15;
void m16;
void m17;
void m18;
void m19;
void m20;
void m21;
void m22;
void m23;
// These should _mostly_ work - `import = require` always desugars to require calls, which do have extension and index resolution (but can't load anything that resolves to esm!)
const m24 = __require("./");
const m25 = __require("./index");
const m26 = __require("./subfolder");
const m27 = __require("./subfolder/");
const m28 = __require("./subfolder/index");
const m29 = __require("./subfolder2");
const m30 = __require("./subfolder2/");
const m31 = __require("./subfolder2/index");
const m32 = __require("./subfolder2/another");
const m33 = __require("./subfolder2/another/");
const m34 = __require("./subfolder2/another/index");
void m24;
void m25;
void m26;
void m27;
void m28;
void m29;
void m30;
void m31;
void m32;
void m33;
void m34;
// These shouldn't work - dynamic `import()` always uses the esm resolver, which does not have extension resolution
const _m35 = import("./");
const _m36 = import("./index");
const _m37 = import("./subfolder");
const _m38 = import("./subfolder/");
const _m39 = import("./subfolder/index");
const _m40 = import("./subfolder2");
const _m41 = import("./subfolder2/");
const _m42 = import("./subfolder2/index");
const _m43 = import("./subfolder2/another");
const _m44 = import("./subfolder2/another/");
const _m45 = import("./subfolder2/another/index");
// esm format file
const x = 1;
export { x };


//// [index.d.ts]
export const x: 1;
//// [index.d.cts]
export const x: 1;
//// [index.d.mts]
export const x: 1;
//// [index.d.ts]
export const x: 1;
//// [index.d.cts]
export const x: 1;
//// [index.d.mts]
export const x: 1;
//// [index.d.ts]
export const x: 1;
//// [index.d.cts]
export const x: 1;
//// [index.d.mts]
export const x: 1;
//// [index.d.cts]
export const x: 1;
//// [index.d.mts]
export const x: 1;
//// [index.d.ts]
export const x: 1;
