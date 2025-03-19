//// [tests/cases/compiler/nestedObjectRest.ts] ////

//// [nestedObjectRest.ts]
// https://github.com/microsoft/TypeScript/issues/43400
var x, y;

[{ ...x }] = [{ abc: 1 }];
for ([{ ...y }] of [[{ abc: 1 }]]) ;

//// [nestedObjectRest.js]
// https://github.com/microsoft/TypeScript/issues/43400
var x, y;
[{ ...x }] = [{ abc: 1 }];
for ([{ ...y }] of [[{ abc: 1 }]])
    ;
