// @allowJs: true
// @checkJs: true
// @outDir: dist
// @module: esnext, commonjs, preserve
// @moduleResolution: bundler
// @noTypesAndSymbols: true

// @Filename: /package.json
{
  "type": "module"
}

// @Filename: /a.ts
export const _ = 0;

// @Filename: /b.mts
export const _ = 0;

// @Filename: /c.cts
export const _ = 0;

// @Filename: /d.js
export const _ = 0;

// @Filename: /e.mjs
export const _ = 0;

// @Filename: /f.mjs
export const _ = 0;

// @Filename: /g.ts
import {} from "./a";
import a = require("./a");

// @Filename: /h.mts
import {} from "./a";
import a = require("./a");

// @Filename: /i.cts
import {} from "./a";
import a = require("./a");

// @Filename: /dummy.ts
export {};
