// @module: commonjs
// @Filename: typeofExternalModules_external.ts
export class C { }

// @Filename: typeofExternalModules_exportAssign.ts
class D { }
export = D;

// @Filename: typeofExternalModules_core.ts
import ext = require('./typeofExternalModules_external');
import exp = require('./typeofExternalModules_exportAssign');

var y1: typeof ext = ext;
y1 = exp;
var y2: typeof exp = exp;
y2 = ext;