//// [tests/cases/compiler/declFileRegressionTests.ts] ////

//// [declFileRegressionTests.ts]
// 'null' not converted to 'any' in d.ts
// function types not piped through correctly
var n = { w: null, x: '', y: () => { }, z: 32 };



//// [declFileRegressionTests.js]
// 'null' not converted to 'any' in d.ts
// function types not piped through correctly
var n = { w: null, x: '', y: () => { }, z: 32 };
