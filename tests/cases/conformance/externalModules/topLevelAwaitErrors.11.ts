// @target: esnext
// @module: system

// @filename: index.ts
// await disallowed in import=
declare var require: any;
import await = require("./other");

// @filename: other.ts
declare const _await: any;
export { _await as await };
