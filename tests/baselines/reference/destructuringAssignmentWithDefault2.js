//// [tests/cases/compiler/destructuringAssignmentWithDefault2.ts] ////

//// [destructuringAssignmentWithDefault2.ts]
const a: { x?: number; y?: number } = { };

let x: number;

// Should not error out
({ x = 0 } = a);
({ x: x = 0} = a);
({ y: x = 0} = a);

// Should be error
({ x = undefined } = a);
({ x: x = undefined } = a);
({ y: x = undefined } = a);

const { x: z1 } = a;
const { x: z2 = 0 } = a;
const { x: z3 = undefined } = a;


declare const r: Iterator<number>;
let done: boolean;
let value;

({ done = false, value } = r.next());
({ done: done = false, value } = r.next());

//// [destructuringAssignmentWithDefault2.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
var a = {};
var x;
// Should not error out
(_a = a.x, x = _a === void 0 ? 0 : _a);
(_b = a.x, x = _b === void 0 ? 0 : _b);
(_c = a.y, x = _c === void 0 ? 0 : _c);
// Should be error
(_d = a.x, x = _d === void 0 ? undefined : _d);
(_e = a.x, x = _e === void 0 ? undefined : _e);
(_f = a.y, x = _f === void 0 ? undefined : _f);
var z1 = a.x;
var _l = a.x, z2 = _l === void 0 ? 0 : _l;
var _m = a.x, z3 = _m === void 0 ? undefined : _m;
var done;
var value;
(_g = r.next(), _h = _g.done, done = _h === void 0 ? false : _h, value = _g.value);
(_j = r.next(), _k = _j.done, done = _k === void 0 ? false : _k, value = _j.value);
