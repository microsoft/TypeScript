//// [declFileRegressionTests.ts]
// 'null' not converted to 'any' in d.ts
// function types not piped through correctly
var n = { w: null, x: '', y: () => { }, z: 32 };



//// [declFileRegressionTests.js]
// 'null' not converted to 'any' in d.ts
// function types not piped through correctly
var n = { w: null, x: '', y: function () { }, z: 32 };


//// [declFileRegressionTests.d.ts]
declare var n: {
    w: any;
    x: string;
    y: () => void;
    z: number;
};
