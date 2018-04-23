//// [tests/cases/compiler/commonJsImportClassExpression.ts] ////

//// [mod1.ts]
export = class Chunk {
    chunk = 1
}

//// [use.ts]
import Chunk = require('./mod1')
declare var c: Chunk;
c.chunk;


//// [mod1.js]
"use strict";
module.exports = /** @class */ (function () {
    function Chunk() {
        this.chunk = 1;
    }
    return Chunk;
}());
//// [use.js]
"use strict";
exports.__esModule = true;
c.chunk;
