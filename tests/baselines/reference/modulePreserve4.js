//// [tests/cases/compiler/modulePreserve4.ts] ////

//// [a.js]
export const x = 0;
module.exports.y = 0; // Error

//// [b.ts]
export default 0;

//// [c.ts]
export = {
  default: function() {}
};

//// [d.ts]
export = function() {};

//// [e.mts]
export = 0;

//// [f.cts]
export default 0;

//// [g.js]
exports.default = 0;

//// [main1.ts]
import { x, y } from "./a"; // No y
import a1 = require("./a"); // { x: 0 }
const a2 = require("./a"); // Error in TS
const a3 = await import("./a"); // { x: 0 }
a3.x;

import b1 from "./b"; // 0
import b2 = require("./b"); // { default: 0 }
b2.default;
const b3 = await import("./b"); // { default: 0 }
b3.default;

import c1 from "./c"; // { default: [Function: default] }
import c2 = require("./c"); // { default: [Function: default] }
c2.default;
import d1 from "./d"; // [Function: default]
import d2 = require("./d"); // [Function: default]
d2();
d2.default(); // Error
const d3 = await import("./d"); // { default: [Function: default] }
d3.default();

import e1 from "./e.mjs"; // 0
import e2 = require("./e.mjs"); // 0
import f1 from "./f.cjs"; // 0
import f2 = require("./f.cjs"); // { default: 0 }
f2.default;

import g1 from "./g"; // { default: 0 }
g1.default;
import g2 = require("./g"); // { default: 0 }
g2.default;

//// [main2.mts]
import { x, y } from "./a"; // No y
import a1 = require("./a"); // { x: 0 }
a1.x;
a1.default.x; // Arguably should exist but doesn't
const a2 = require("./a"); // Error in TS

import b1 from "./b"; // 0
import b2 = require("./b"); // { default: 0 }

import c1 from "./c"; // { default: [Function: default] }
import c2 = require("./c"); // { default: [Function: default] }
import d1 from "./d"; // [Function: default]
import d2 = require("./d"); // [Function: default]
import e1 from "./e.mjs"; // 0
import e2 = require("./e.mjs"); // 0
import f1 from "./f.cjs"; // 0
import f2 = require("./f.cjs"); // { default: 0 }

import g1 from "./g"; // { default: 0 }
import g2 = require("./g"); // { default: 0 }

//// [main3.cjs]
import { x, y } from "./a"; // No y
import a1 = require("./a"); // Error in JS
const a2 = require("./a"); // { x: 0 }

import b1 from "./b"; // 0
const b2 = require("./b"); // { default: 0 }

import c1 from "./c"; // { default: [Function: default] }
const c2 = require("./c"); // { default: [Function: default] }
import d1 from "./d"; // [Function: default]
const d2 = require("./d"); // [Function: default]
import e1 from "./e.mjs"; // 0
const e2 = require("./e.mjs"); // 0
import f1 from "./f.cjs"; // 0
const f2 = require("./f.cjs"); // { default: 0 }

import g1 from "./g"; // { default: 0 }
const g2 = require("./g"); // { default: 0 }

//// [main4.cjs]
exports.x = require("./g");

//// [dummy.ts]
export {}; // Silly test harness


//// [a.js]
export const x = 0;
module.exports.y = 0; // Error
//// [b.js]
export default 0;
//// [c.js]
module.exports = {
    default: function () { }
};
//// [d.js]
module.exports = function () { };
//// [e.mjs]
module.exports = 0;
//// [f.cjs]
export default 0;
//// [g.js]
"use strict";
exports.default = 0;
//// [main1.js]
import { x, y } from "./a"; // No y
const a1 = require("./a"); // { x: 0 }
const a2 = require("./a"); // Error in TS
const a3 = await import("./a"); // { x: 0 }
a3.x;
import b1 from "./b"; // 0
const b2 = require("./b"); // { default: 0 }
b2.default;
const b3 = await import("./b"); // { default: 0 }
b3.default;
import c1 from "./c"; // { default: [Function: default] }
const c2 = require("./c"); // { default: [Function: default] }
c2.default;
import d1 from "./d"; // [Function: default]
const d2 = require("./d"); // [Function: default]
d2();
d2.default(); // Error
const d3 = await import("./d"); // { default: [Function: default] }
d3.default();
import e1 from "./e.mjs"; // 0
const e2 = require("./e.mjs"); // 0
import f1 from "./f.cjs"; // 0
const f2 = require("./f.cjs"); // { default: 0 }
f2.default;
import g1 from "./g"; // { default: 0 }
g1.default;
const g2 = require("./g"); // { default: 0 }
g2.default;
//// [main2.mjs]
import { x, y } from "./a"; // No y
const a1 = require("./a"); // { x: 0 }
a1.x;
a1.default.x; // Arguably should exist but doesn't
const a2 = require("./a"); // Error in TS
import b1 from "./b"; // 0
const b2 = require("./b"); // { default: 0 }
import c1 from "./c"; // { default: [Function: default] }
const c2 = require("./c"); // { default: [Function: default] }
import d1 from "./d"; // [Function: default]
const d2 = require("./d"); // [Function: default]
import e1 from "./e.mjs"; // 0
const e2 = require("./e.mjs"); // 0
import f1 from "./f.cjs"; // 0
const f2 = require("./f.cjs"); // { default: 0 }
import g1 from "./g"; // { default: 0 }
const g2 = require("./g"); // { default: 0 }
//// [main3.cjs]
import { x, y } from "./a"; // No y
const a1 = require("./a"); // Error in JS
const a2 = require("./a"); // { x: 0 }
import b1 from "./b"; // 0
const b2 = require("./b"); // { default: 0 }
import c1 from "./c"; // { default: [Function: default] }
const c2 = require("./c"); // { default: [Function: default] }
import d1 from "./d"; // [Function: default]
const d2 = require("./d"); // [Function: default]
import e1 from "./e.mjs"; // 0
const e2 = require("./e.mjs"); // 0
import f1 from "./f.cjs"; // 0
const f2 = require("./f.cjs"); // { default: 0 }
import g1 from "./g"; // { default: 0 }
const g2 = require("./g"); // { default: 0 }
//// [main4.cjs]
exports.x = require("./g");
//// [dummy.js]
export {}; // Silly test harness


//// [a.d.ts]
export const x: 0;
//// [b.d.ts]
declare const _default: 0;
export default _default;
//// [c.d.ts]
declare const _default: {
    default: () => void;
};
export = _default;
//// [d.d.ts]
declare const _default: () => void;
export = _default;
//// [e.d.mts]
declare const _default: 0;
export = _default;
//// [f.d.cts]
declare const _default: 0;
export default _default;
//// [g.d.ts]
declare const _default: 0;
export default _default;
//// [main1.d.ts]
export {};
//// [main2.d.mts]
export {};
//// [main3.d.cts]
export {};
//// [main4.d.cts]
export const x: typeof import("./g");
//// [dummy.d.ts]
export {};
