//// [tests/cases/compiler/umdDependencyCommentName2.ts] ////

//// [umdDependencyCommentName2.ts]
///<amd-dependency path='bar' name='b'/>
///<amd-dependency path='foo'/>
///<amd-dependency path='goo' name='c'/>

import m1 = require("m2")
m1.f();


//// [umdDependencyCommentName2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<amd-dependency path='bar' name='b'/>
///<amd-dependency path='foo'/>
///<amd-dependency path='goo' name='c'/>
const m1 = require("m2");
m1.f();
