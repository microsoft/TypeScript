//// [tests/cases/conformance/expressions/typeAssertions/duplicatePropertiesInTypeAssertions02.ts] ////

//// [duplicatePropertiesInTypeAssertions02.ts]
let x = {} as {a: number; a: number};

//// [duplicatePropertiesInTypeAssertions02.js]
var x = {};


//// [duplicatePropertiesInTypeAssertions02.d.ts]
declare let x: {
    a: number;
    a: number;
};
