//// [emptyAssignmentPatterns02_ES5.ts]

var a: any;
let x, y, z, a1, a2, a3;

({} = { x, y, z } = a);
([] = [ a1, a2, a3] = a);

//// [emptyAssignmentPatterns02_ES5.js]
var a;
var x, y, z, a1, a2, a3;
((x = a.x, y = a.y, z = a.z, a));
((a1 = a[0], a2 = a[1], a3 = a[2], a));
