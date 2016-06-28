// @module: commonjs
// @Filename: typeofAmbientExternalModules_0.ts
export class C { foo: string; }

// @Filename: typeofAmbientExternalModules_1.ts
class D { bar: string; }
export = D;

// @Filename: typeofAmbientExternalModules_2.ts
///<reference path='typeofAmbientExternalModules_0.ts'/>
///<reference path='typeofAmbientExternalModules_1.ts'/>
import ext = require('./typeofAmbientExternalModules_0');
import exp = require('./typeofAmbientExternalModules_1');

var y1: typeof ext = ext;
y1 = exp;
var y2: typeof exp = exp;
y2 = ext;