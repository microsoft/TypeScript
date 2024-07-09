//// [tests/cases/conformance/salsa/assignmentToVoidZero1.ts] ////

//// [assignmentToVoidZero1.js]
// #38552
exports.y = exports.x = void 0;
exports.x = 1;
exports.y = 2;


//// [assignmentToVoidZero1.js]
// #38552
exports.y = exports.x = void 0;
exports.x = 1;
exports.y = 2;


//// [assignmentToVoidZero1.d.ts]
export const x: 1;
export const y: 2;
