//// [tests/cases/conformance/es6/modules/multipleDefaultExports05.ts] ////

//// [multipleDefaultExports05.ts]
export default class AA1 {}

export default class BB1 {}

export default class CC1 {}


//// [multipleDefaultExports05.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AA1 {
}
exports.default = AA1;
class BB1 {
}
exports.default = BB1;
class CC1 {
}
exports.default = CC1;
