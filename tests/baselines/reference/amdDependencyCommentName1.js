//// [tests/cases/compiler/amdDependencyCommentName1.ts] ////

//// [amdDependencyCommentName1.ts]
///<amd-dependency path='bar' name='b'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyCommentName1.js]
"use strict";
///<amd-dependency path='bar' name='b'/>
Object.defineProperty(exports, "__esModule", { value: true });
var m1 = require("m2");
m1.f();
