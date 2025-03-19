//// [tests/cases/compiler/amdDependencyCommentName2.ts] ////

//// [amdDependencyCommentName2.ts]
///<amd-dependency path='bar' name='b'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyCommentName2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<amd-dependency path='bar' name='b'/>
const m1 = require("m2");
m1.f();
