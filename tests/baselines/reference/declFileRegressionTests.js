//// [declFileRegressionTests.ts]
// 'null' not converted to 'any' in d.ts
// function types not piped through correctly
var n = { w: null, x: '', y: () => { }, z: 32 };



//// [declFileRegressionTests.js]
var n = { w: null, x: '', y: function () {
}, z: 32 };


//// [declFileRegressionTests.d.ts]
