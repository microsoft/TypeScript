// Type type of the null literal is the Null type.
// Null can be converted to anything except Void
var n = <number>(null);
var s = <string>(null);
var b = <boolean>(n);

function isVoid() : void { }

// Expected error: Values of type null and void cannot be compared
if(null === isVoid()) { }
