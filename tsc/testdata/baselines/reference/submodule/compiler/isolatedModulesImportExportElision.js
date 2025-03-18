//// [tests/cases/compiler/isolatedModulesImportExportElision.ts] ////

//// [file1.ts]
import {c} from "module"
import {c2} from "module"
import * as ns from "module"

class C extends c2.C {
}

let x = new c();
let y = ns.value;

export {c1} from "module";
export var z = x;

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.c1 = void 0;
const module_1 = require("module");
const module_2 = require("module");
const ns = require("module");
class C extends module_2.c2.C {
}
let x = new module_1.c();
let y = ns.value;
const module_3 = require("module");
Object.defineProperty(exports, "c1", { enumerable: true, get: function () { return module_3.c1; } });
exports.z = x;
