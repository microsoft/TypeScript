//// [tests/cases/compiler/umdDependencyComment2.ts] ////

//// [umdDependencyComment2.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();


//// [umdDependencyComment2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m1 = require("m2");
m1.f();
