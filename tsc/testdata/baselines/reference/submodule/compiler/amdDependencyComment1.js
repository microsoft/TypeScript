//// [tests/cases/compiler/amdDependencyComment1.ts] ////

//// [amdDependencyComment1.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyComment1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m1 = require("m2");
m1.f();
