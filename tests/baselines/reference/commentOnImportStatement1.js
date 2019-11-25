//// [commentOnImportStatement1.ts]
/* Copyright */

import foo = require('./foo');


//// [commentOnImportStatement1.js]
/* Copyright */
define(["require", "exports", "./foo"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
