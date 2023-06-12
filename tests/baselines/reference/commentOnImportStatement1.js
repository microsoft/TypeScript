//// [tests/cases/compiler/commentOnImportStatement1.ts] ////

//// [commentOnImportStatement1.ts]
/* Copyright */

import foo = require('./foo');


//// [commentOnImportStatement1.js]
/* Copyright */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
