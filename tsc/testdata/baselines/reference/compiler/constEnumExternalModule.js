//// [tests/cases/compiler/constEnumExternalModule.ts] ////

//// [m1.ts]
const enum E {
    V = 100
}

export = E
//// [m2.ts]
import A = require('m1')
var v = A.V;

//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const A = require("m1");
var v = A.V;
