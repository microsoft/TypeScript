// @module: preserve
// @target: esnext
// @verbatimModuleSyntax: true
// @checkJs: true
// @outDir: dist
// @declaration: true
// @strict: true

// @Filename: /a.js
export const x = 0;
module.exports.y = 0; // Error

// @Filename: /b.ts
export default 0;

// @Filename: /c.ts
export = {
  default: function() {}
};

// @Filename: /d.ts
export = function() {};

// @Filename: /e.mts
export = 0;

// @Filename: /f.cts
export default 0;

// @Filename: /g.js
exports.default = 0;

// @Filename: /main1.ts
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

// @Filename: /main2.mts
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

// @Filename: /main3.cjs
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

// @Filename: /main4.cjs
exports.x = require("./g");

// @Filename: /dummy.ts
export {}; // Silly test harness
