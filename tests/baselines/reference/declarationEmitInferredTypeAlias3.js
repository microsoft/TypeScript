//// [tests/cases/compiler/declarationEmitInferredTypeAlias3.ts] ////

//// [0.ts]
{
    type Data = string | boolean;
    let obj: Data = true;
}
export { }

//// [1.ts]
var x = "hi" || 5;
export default x;

//// [0.js]
"use strict";
exports.__esModule = true;
{
    var obj = true;
}
//// [1.js]
"use strict";
exports.__esModule = true;
var x = "hi" || 5;
exports["default"] = x;


//// [0.d.ts]
export {};
//// [1.d.ts]
declare var x: string | number;
export default x;
