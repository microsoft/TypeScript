//// [tests/cases/compiler/umdDependencyCommentName1.ts] ////

//// [umdDependencyCommentName1.ts]
///<amd-dependency path='bar' name='b'/>

import m1 = require("m2")
m1.f();


//// [umdDependencyCommentName1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m1 = require("m2");
m1.f();
