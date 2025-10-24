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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
class Member {
}
exports.Member = Member;
exports.default = Member;
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = require("./b");
const b_2 = require("./b");
const ns = require("./b");
const r = require("./b");
new b_1.Member();
new b_2.default();
new b_2.Member();
new ns.Member();
new r.Member();
