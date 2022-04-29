// @module: commonjs
// @Filename: decoratorOnImportEquals2_0.ts
export var X;

// @Filename: decoratorOnImportEquals2_1.ts
@dec
import lib = require('./decoratorOnImportEquals2_0');

declare function dec<T>(target: T): T;