//// [tests/cases/compiler/concatTuples.ts] ////

//// [concatTuples.ts]
let ijs: [number, number][] = [[1, 2]];
ijs = ijs.concat([[3, 4], [5, 6]]);


//// [concatTuples.js]
var ijs = [[1, 2]];
ijs = ijs.concat([[3, 4], [5, 6]]);
