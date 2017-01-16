//// [tests/cases/compiler/declarationEmitInferedTypeAlias7.ts] ////

//// [0.ts]

export type Data = string | boolean;
let obj: Data = true;

//// [1.ts]
let v = "str" || true;
export { v }

//// [0.js]
"use strict";
var obj = true;
//// [1.js]
"use strict";
var v = "str" || true;
exports.v = v;


//// [0.d.ts]
export declare type Data = string | boolean;
//// [1.d.ts]
declare let v: string | boolean;
export { v };
