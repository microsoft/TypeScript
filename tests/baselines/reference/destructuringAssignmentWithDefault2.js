//// [destructuringAssignmentWithDefault2.ts]
const a: { x?: number; y?: number } = { };

let x: number;

({ x = 0 } = a);
({ x: x = 0} = a);
({ y: x = 0} = a);



//// [destructuringAssignmentWithDefault2.js]
var _a, _b, _c;
var a = {};
var x;
(_a = a.x, x = _a === void 0 ? 0 : _a);
(_b = a.x, x = _b === void 0 ? 0 : _b);
(_c = a.y, x = _c === void 0 ? 0 : _c);
