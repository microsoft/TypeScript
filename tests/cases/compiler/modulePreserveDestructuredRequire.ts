// @module: preserve
// @target: esnext
// @verbatimModuleSyntax: true
// @checkJs: true
// @noEmit: true
// @strict: true

// @Filename: /mod.js
exports.x = 1;
exports.y = 2;

// @Filename: /file.cjs
// Destructured and whole-module require are valid CommonJS and must not error under
// --module preserve + --verbatimModuleSyntax (https://github.com/microsoft/TypeScript/issues/63696).
const { x } = require("./mod");
const { y: renamed } = require("./mod");
const whole = require("./mod");
x;
renamed;
whole.y;

// True ESM syntax in a .cjs file remains an error.
import { x as x2 } from "./mod";
