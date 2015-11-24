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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var module_1 = require("module");
var module_2 = require("module");
var ns = require("module");
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(module_2.c2.C);
var x = new module_1.c();
var y = ns.value;
var module_3 = require("module");
exports.c1 = module_3.c1;
exports.z = x;
