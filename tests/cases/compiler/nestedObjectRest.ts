// @target: es2017

// https://github.com/microsoft/TypeScript/issues/43400
var x, y;

[{ ...x }] = [{ abc: 1 }];
for ([{ ...y }] of [[{ abc: 1 }]]) ;