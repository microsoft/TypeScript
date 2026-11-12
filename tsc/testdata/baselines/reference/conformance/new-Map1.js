//// [tests/cases/conformance/es6/mapConstruction/new-Map1.ts] ////

//// [new-Map1.ts]
// https://github.com/microsoft/TypeScript/issues/37527#issuecomment-628802102
const sample: Map<number | string, number> = new Map([[1, 1], ["yes", 1]]);

// https://github.com/microsoft/TypeScript/issues/37527#issuecomment-750412755
function test(_a: Map<string | number, boolean>) {}
test(new Map([["test" ,true] ,[1 ,false]]))

// https://github.com/microsoft/TypeScript/issues/33611#issue-498858215
const M1 = new Map([
	['k', {a: 1, b: 'asd'}],
	['k', {a: 2, b: 'asd'}],
]);
const M2 = new Map([
	...M1,
	['k', {a: 1}],
]);

// Additional cases
const m1 = new Map([['num', 123], ['str', 'val1']]);
const m2 = new Map([['num', 456], ['str', 'val2']] as const);
const m3 = new Map([['num' as const, 456], ['str' as const, 'val2']]);


//// [new-Map1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/37527#issuecomment-628802102
const sample = new Map([[1, 1], ["yes", 1]]);
// https://github.com/microsoft/TypeScript/issues/37527#issuecomment-750412755
function test(_a) { }
test(new Map([["test", true], [1, false]]));
// https://github.com/microsoft/TypeScript/issues/33611#issue-498858215
const M1 = new Map([
    ['k', { a: 1, b: 'asd' }],
    ['k', { a: 2, b: 'asd' }],
]);
const M2 = new Map([
    ...M1,
    ['k', { a: 1 }],
]);
// Additional cases
const m1 = new Map([['num', 123], ['str', 'val1']]);
const m2 = new Map([['num', 456], ['str', 'val2']]);
const m3 = new Map([['num', 456], ['str', 'val2']]);
