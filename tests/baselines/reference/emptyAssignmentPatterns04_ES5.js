//// [emptyAssignmentPatterns04_ES5.ts]

var a: any;
let x, y, z, a1, a2, a3;

({ x, y, z } = {} = a);
([ a1, a2, a3] = [] = a);

//// [emptyAssignmentPatterns04_ES5.js]
var a;
var x, y, z, a1, a2, a3;
(_a = a, x = _a.x, y = _a.y, z = _a.z, _a);
(_b = a, a1 = _b[0], a2 = _b[1], a3 = _b[2], _b);
var _a, _b;


//// [emptyAssignmentPatterns04_ES5.d.ts]
declare var a: any;
declare let x: any, y: any, z: any, a1: any, a2: any, a3: any;
