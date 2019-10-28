//// [commonTypeIntersection.ts]
declare let x1: { __typename?: 'TypeTwo' } & { a: boolean };
let y1: { __typename?: 'TypeOne' } & { a: boolean} = x1;  // No error!
declare let x2: { __typename?: 'TypeTwo' } & string;
let y2: { __typename?: 'TypeOne' } & string = x2;  // No error!


//// [commonTypeIntersection.js]
var y1 = x1; // No error!
var y2 = x2; // No error!
