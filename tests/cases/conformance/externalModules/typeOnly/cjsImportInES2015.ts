// @module: es2015
// @moduleResolution: node

// @Filename: /project/node_modules/cjs-dep/index.d.ts
declare class SpecialError extends Error {}
export = SpecialError;

// @Filename: /project/index.ts
import type SpecialError = require("cjs-dep");
function handleError(err: SpecialError) {}
