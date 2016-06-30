//// [tests/cases/compiler/unusedImports12.ts] ////

//// [b.ts]

export class Member {}
export default Member;


//// [a.ts]
import { Member } from './b';
import d, { Member as M } from './b';
import * as ns from './b';
import r = require("./b");


//// [b.js]
"use strict";
var Member = (function () {
    function Member() {
    }
    return Member;
}());
exports.Member = Member;
exports.__esModule = true;
exports["default"] = Member;
//// [a.js]
"use strict";
