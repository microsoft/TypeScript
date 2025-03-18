//// [tests/cases/compiler/systemModule9.ts] ////

//// [systemModule9.ts]
import * as ns from 'file1';
import {a, b as c} from 'file2';
import d from 'file3'
import 'file4'
import e, * as ns2 from 'file5';
import ns3 = require('file6');

ns.f();
a();
c();
d();
e();
ns2.f();
ns3.f();

export * from 'file7';

var x, y = true;
export {x};
export {y as z};

//// [systemModule9.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.x = void 0;
const ns = require("file1");
const file2_1 = require("file2");
const file3_1 = require("file3");
require("file4");
const file5_1 = require("file5"), ns2 = file5_1;
const ns3 = require("file6");
ns.f();
(0, file2_1.a)();
(0, file2_1.b)();
(0, file3_1.default)();
(0, file5_1.default)();
ns2.f();
ns3.f();
__exportStar(require("file7"), exports);
var x, y = true;
exports.z = y;
