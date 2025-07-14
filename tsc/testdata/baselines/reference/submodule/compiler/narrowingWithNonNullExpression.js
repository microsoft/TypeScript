//// [tests/cases/compiler/narrowingWithNonNullExpression.ts] ////

//// [narrowingWithNonNullExpression.ts]
const m = ''.match('');
m! && m[0];
m?.[0]! && m[0];


//// [narrowingWithNonNullExpression.js]
const m = ''.match('');
m && m[0];
((m === null || m === void 0 ? void 0 : m[0])) && m[0];
