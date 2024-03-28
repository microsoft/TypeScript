//// [tests/cases/compiler/commentOnImportStatement3.ts] ////

//// [commentOnImportStatement3.ts]
/* copyright */

/* not copyright */
import foo = require('./foo');

//// [commentOnImportStatement3.js]
"use strict";
/* copyright */
Object.defineProperty(exports, "__esModule", { value: true });
