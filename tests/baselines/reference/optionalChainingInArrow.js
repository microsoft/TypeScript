//// [optionalChainingInArrow.ts]
// https://github.com/microsoft/TypeScript/issues/41814
const test = (names: string[]) =>
    // single-line comment
    names?.filter(x => x);


//// [optionalChainingInArrow.js]
// https://github.com/microsoft/TypeScript/issues/41814
var test = function (names) { return 
// single-line comment
names === null || 
// single-line comment
names === void 0 ? void 0 : 
// single-line comment
names.filter(function (x) { return x; }); };
