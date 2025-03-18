//// [tests/cases/compiler/commonJsImportClassExpression.ts] ////

//// [mod1.ts]
export = class {
    chunk = 1
}

//// [use.ts]
import Chunk = require('./mod1')
declare var c: Chunk;
c.chunk;


//// [mod1.js]
"use strict";
module.exports = class {
    chunk = 1;
};
//// [use.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
c.chunk;
