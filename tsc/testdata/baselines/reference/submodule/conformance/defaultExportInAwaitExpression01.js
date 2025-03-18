//// [tests/cases/conformance/es6/modules/defaultExportInAwaitExpression01.ts] ////

//// [a.ts]
const x = new Promise( ( resolve, reject ) => { resolve( {} ); } );
export default x;

//// [b.ts]
import x from './a';

( async function() {
    const value = await x;
}() );


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = new Promise((resolve, reject) => { resolve({}); });
exports.default = x;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
(async function () {
    const value = await a_1.default;
}());
