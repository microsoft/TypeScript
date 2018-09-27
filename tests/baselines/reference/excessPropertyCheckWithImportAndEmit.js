//// [tests/cases/compiler/excessPropertyCheckWithImportAndEmit.ts] ////

//// [ourParam.ts]
export default {
    nonExistingParam: '42',
}

//// [index.ts]
import ourParam from './ourParam'
export interface OurType {
    a: number
}
const ourMethod = (param: OurType) => {
    console.log(param)
}
const result = ourMethod(ourParam)

//// [ourParam.js]
"use strict";
exports.__esModule = true;
exports["default"] = {
    nonExistingParam: '42'
};
//// [index.js]
"use strict";
exports.__esModule = true;
var ourParam_1 = require("./ourParam");
var ourMethod = function (param) {
    console.log(param);
};
var result = ourMethod(ourParam_1["default"]);
