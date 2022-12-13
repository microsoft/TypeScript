// @moduleResolution: bundler
// @checkJs: true
// @allowJs: true
// @outDir: out

// @Filename: /node_modules/@types/node/index.d.ts
declare var require: (...args: any[]) => any;

// @Filename: /mainJs.js
import {} from "./a";
import("./a");
const _ = require("./a"); // No resolution
_.a; // any

// @Filename: /main.ts
import {} from "./a";
import _ = require("./a"); // Error
export = {}; // Error
export {};

// @Filename: /a.ts
export const a = "a";
