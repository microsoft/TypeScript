//// [tests/cases/conformance/expressions/optionalChaining/optionalChainingInArrow.ts] ////

//// [optionalChainingInArrow.ts]
// https://github.com/microsoft/TypeScript/issues/41814
const test = (names: string[]) =>
    // single-line comment
    names?.filter(x => x);


//// [optionalChainingInArrow.js]
// https://github.com/microsoft/TypeScript/issues/41814
const test = (names) => 
// single-line comment
names?.filter(x => x);
