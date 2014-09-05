//// [nullAssignedToUndefined.ts]
var x = undefined = null; // error
var y: typeof undefined = null; // ok, widened

//// [nullAssignedToUndefined.js]
var x = undefined = null; // error
var y = null; // ok, widened
