// @verbatimModuleSyntax: true
// @target: esnext
// @module: commonjs
// @moduleResolution: node

// @Filename: /a.ts
interface I {}
export = I;

// @Filename: /b.ts
import I = require("./a");

// @Filename: /c.ts
interface I {}
namespace I {
    export const x = 1;
}
export = I;

// @Filename: /d.ts
import I = require("./c");
import type J = require("./c");
export = J;

// @Filename: /e.d.ts
interface I {}
export = I;

// @Filename: /f.ts
import type I = require("./e");
const I = {};
export = I;

// @Filename: /z.ts
// test harness is weird if the last file includs a require >:(