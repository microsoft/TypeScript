// @module: commonjs
// @Filename: enumFromExternalModule_0.ts
export enum Mode { Open }

// @Filename: enumFromExternalModule_1.ts
///<reference path='enumFromExternalModule_0.ts'/>
import f = require('./enumFromExternalModule_0');

var x = f.Mode.Open;
