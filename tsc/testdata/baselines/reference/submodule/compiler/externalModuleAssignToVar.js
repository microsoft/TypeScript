//// [tests/cases/compiler/externalModuleAssignToVar.ts] ////

//// [externalModuleAssignToVar_ext.ts]
class D { foo: string; }
export = D;

//// [externalModuleAssignToVar_core_require.ts]
export class C { bar: string; }

//// [externalModuleAssignToVar_core_require2.ts]
class C { baz: string; }
export = C;

//// [externalModuleAssignToVar_core.ts]
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


//// [externalModuleAssignToVar_core_require.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
    bar;
}
exports.C = C;
//// [externalModuleAssignToVar_core.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ext = require("externalModuleAssignToVar_core_require");
var y1 = ext;
y1 = ext;
const ext2 = require("externalModuleAssignToVar_core_require2");
var y2 = ext2;
y2 = ext2;
const ext3 = require("externalModuleAssignToVar_ext");
var y3 = ext3;
y3 = ext3;
