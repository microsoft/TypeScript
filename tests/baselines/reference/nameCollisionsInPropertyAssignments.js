//// [nameCollisionsInPropertyAssignments.ts]
var x = 1
var y = { x() { x++; } }; 

//// [nameCollisionsInPropertyAssignments.js]
var x = 1;
var y = { x: function () { x++; } };
