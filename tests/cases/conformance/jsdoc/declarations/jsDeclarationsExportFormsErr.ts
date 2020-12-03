// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: cls.js
export class Foo {}

// @filename: bar.js
import ns = require("./cls");
export = ns; // TS Only

// @filename: bin.js
import * as ns from "./cls";
module.exports = ns; // We refuse to bind cjs module exports assignments in the same file we find an import in

// @filename: globalNs.js
export * from "./cls";
export as namespace GLO; // TS Only

// @filename: includeAll.js
import "./bar";
import "./bin";
import "./globalNs";
