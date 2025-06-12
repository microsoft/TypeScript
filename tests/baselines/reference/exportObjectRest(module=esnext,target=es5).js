//// [tests/cases/compiler/exportObjectRest.ts] ////

//// [exportObjectRest.ts]
export const { x, ...rest } = { x: 'x', y: 'y' };

//// [exportObjectRest.js]
var _a;
export const { x } = (_a = { x: 'x', y: 'y' }, _a), rest = __rest(_a, ["x"]);
