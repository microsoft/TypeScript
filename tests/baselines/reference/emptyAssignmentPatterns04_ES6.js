//// [emptyAssignmentPatterns04_ES6.ts]

var a: any;
let x, y, z, a1, a2, a3;

({ x, y, z } = {} = a);
([ a1, a2, a3] = [] = a);

//// [emptyAssignmentPatterns04_ES6.js]
var a;
let x, y, z, a1, a2, a3;
({ x, y, z } = {} = a);
([a1, a2, a3] = [] = a);
