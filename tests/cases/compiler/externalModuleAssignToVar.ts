//@module: amd
// @Filename: externalModuleAssignToVar_ext.ts
class D { foo: string; }
export = D;

// @Filename: externalModuleAssignToVar_core_require.ts
export class C { bar: string; }

// @Filename: externalModuleAssignToVar_core_require2.ts
class C { baz: string; }
export = C;

// @Filename: externalModuleAssignToVar_core.ts
///<reference path='externalModuleAssignToVar_core_require.ts'/>
import ext = require('externalModuleAssignToVar_core_require');
var y1: { C: new() => ext.C; } = ext;
y1 = ext; // ok

import ext2 = require('externalModuleAssignToVar_core_require2');
var y2: new() => ext2 = ext2;
y2 = ext2; // ok

import ext3 = require('externalModuleAssignToVar_ext');
var y3: new () => ext3 = ext3;
y3 = ext3; // ok
