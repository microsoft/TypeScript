//// [tests/cases/compiler/genericInference1.ts] ////

//// [genericInference1.ts]
['a', 'b', 'c'].map(x => x.length);

//// [genericInference1.js]
['a', 'b', 'c'].map(function (x) { return x.length; });
