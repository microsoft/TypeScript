//// [tests/cases/compiler/amdDependencyComment2.ts] ////

//// [amdDependencyComment2.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyComment2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m1 = require("m2");
m1.f();
