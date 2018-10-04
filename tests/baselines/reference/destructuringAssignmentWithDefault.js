//// [destructuringAssignmentWithDefault.ts]
const a: { x?: number } = { };
let x = 0;
({x = 1} = a);


//// [destructuringAssignmentWithDefault.js]
var _a;
var a = {};
var x = 0;
(_a = a.x, x = _a === void 0 ? 1 : _a);
