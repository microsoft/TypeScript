// @module: commonjs
// @target: es2015
// @Filename: /a.ts
export class A {}

// @Filename: /b.ts
import type from = require('./a');
