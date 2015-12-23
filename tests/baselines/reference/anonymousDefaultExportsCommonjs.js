//// [tests/cases/conformance/es6/moduleExportsCommonjs/anonymousDefaultExportsCommonjs.ts] ////

//// [a.ts]
export default class {}

//// [b.ts]
export default function() {}

//// [a.js]
"use strict";
class default_1 {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//// [b.js]
"use strict";
function default_1() { }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
