//// [tests/cases/compiler/unusedImports11.ts] ////

//// [b.ts]
export class Member {}
export default Member;


//// [a.ts]
import { Member } from './b';
import d, { Member as M } from './b';
import * as ns from './b';
import r = require("./b");

new Member();
new d();
new M();
new ns.Member();
new r.Member();

//// [b.js]
"use strict";
exports.__esModule = true;
var Member = /** @class */ (function () {
    function Member() {
    }
    return Member;
}());
exports.Member = Member;
exports["default"] = Member;
//// [a.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var b_1 = require("./b");
var b_2 = __importDefault(require("./b"));
var ns = __importStar(require("./b"));
var r = require("./b");
new b_1.Member();
new b_2["default"]();
new b_2.Member();
new ns.Member();
new r.Member();
