//// [destructuringAssignmentWithDefault2.ts]
const a: { x?: number; y?: number } = { };

let x: number;

({ x = 0 } = a);
({ x: x = 0} = a);
({ y: x = 0} = a);


declare const r: Iterator<number>;
let done: boolean;
let value;

({ done = false, value } = r.next());
({ done: done = false, value } = r.next());

//// [destructuringAssignmentWithDefault2.js]
var _a, _b, _c, _d, _e, _f, _g;
var a = {};
var x;
(_a = a.x, x = _a === void 0 ? 0 : _a);
(_b = a.x, x = _b === void 0 ? 0 : _b);
(_c = a.y, x = _c === void 0 ? 0 : _c);
var done;
var value;
(_d = r.next(), _e = _d.done, done = _e === void 0 ? false : _e, value = _d.value);
(_f = r.next(), _g = _f.done, done = _g === void 0 ? false : _g, value = _f.value);
