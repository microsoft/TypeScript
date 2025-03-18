//// [tests/cases/compiler/shorthand-property-es6-amd.ts] ////

//// [test.ts]
import {foo} from './foo';
const baz = 42;
const bar = { foo, baz };


//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("./foo");
const baz = 42;
const bar = { foo: foo_1.foo, baz };
