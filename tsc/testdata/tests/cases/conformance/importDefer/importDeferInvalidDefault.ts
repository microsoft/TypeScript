// @target: es2015

// @module: esnext, commonjs
// @allowJs: true
// @outDir: out
// @filename: a.ts
export default function foo() {
    console.log("foo from a");
}

// @filename: b.ts
import defer foo from "./a";

foo();

import defer "./a.js";
import defer "./a.js" with { type: "json" };

// @filename: c.js
// @ts-check
import defer "./a.js";
import defer "./a.js" with { type: "json" };

// @filename: d.js
import defer "./a.js";
