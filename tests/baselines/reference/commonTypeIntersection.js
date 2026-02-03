//// [tests/cases/conformance/types/intersection/commonTypeIntersection.ts] ////

//// [commonTypeIntersection.ts]
declare let x1: { __typename?: 'TypeTwo' } & { a: boolean };
let y1: { __typename?: 'TypeOne' } & { a: boolean} = x1;  // should error here
declare let x2: { __typename?: 'TypeTwo' } & string;
let y2: { __typename?: 'TypeOne' } & string = x2;  // should error here


//// [commonTypeIntersection.js]
var y1 = x1; // should error here
var y2 = x2; // should error here
