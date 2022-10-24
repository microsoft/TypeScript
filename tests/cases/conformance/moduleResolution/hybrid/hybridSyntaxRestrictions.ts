// @moduleResolution: hybrid
// @checkJs: true
// @allowJs: true
// @outDir: out

// @Filename: /node_modules/@types/node/index.d.ts
declare var require: (...args: any[]) => any;

// @Filename: /a.ts
export {};

// @Filename: /mainJs.js
import {} from "./a";
const _ = require("./a"); // No resolution

// @Filename: /main.ts
import {} from "./a";
import _ = require("./a"); // Error
export = {}; // Error
export {};
