//// [tests/cases/compiler/processingDiagnosticSkipLibCheck.ts] ////

//// [index.d.ts]
/// <reference types="cookie-session"/>
export const foo = 1;

//// [package.json]
{
    "name": "foo",
    "version": "1.0.0",
    "types": "index.d.ts"
}
//// [index.ts]
import { foo } from 'foo';
const y = foo;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("foo");
const y = foo_1.foo;
