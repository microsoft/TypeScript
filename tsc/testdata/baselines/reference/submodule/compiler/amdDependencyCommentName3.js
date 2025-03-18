//// [tests/cases/compiler/amdDependencyCommentName3.ts] ////

//// [amdDependencyCommentName3.ts]
///<amd-dependency path='bar' name='b'/>
///<amd-dependency path='foo'/>
///<amd-dependency path='goo' name='c'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyCommentName3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m1 = require("m2");
m1.f();
