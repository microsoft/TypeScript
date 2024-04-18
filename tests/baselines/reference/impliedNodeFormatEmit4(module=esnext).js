//// [tests/cases/compiler/impliedNodeFormatEmit4.ts] ////

//// [package.json]
{
  "type": "commonjs"
}

//// [a.ts]
export const _ = 0;

//// [b.mts]
export const _ = 0;

//// [c.cts]
export const _ = 0;

//// [d.js]
export const _ = 0;

//// [e.mjs]
export const _ = 0;

//// [f.mjs]
export const _ = 0;

//// [g.ts]
import {} from "./a";
import a = require("./a");

//// [h.mts]
import {} from "./a";
import a = require("./a");

//// [i.cts]
import {} from "./a";
import a = require("./a");

//// [dummy.ts]
export {};


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
exports._ = 0;
//// [b.mjs]
export var _ = 0;
//// [c.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
exports._ = 0;
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
exports._ = 0;
//// [e.mjs]
export var _ = 0;
//// [f.mjs]
export var _ = 0;
//// [g.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [h.mjs]
export {};
//// [i.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [dummy.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
