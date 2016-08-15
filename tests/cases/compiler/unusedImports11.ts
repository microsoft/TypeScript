//@noUnusedLocals:true
//@noUnusedParameters:true

// @filename: b.ts
export class Member {}
export default Member;


// @filename: a.ts
import { Member } from './b';
import d, { Member as M } from './b';
import * as ns from './b';
import r = require("./b");

new Member();
new d();
new M();
new ns.Member();
new r.Member();