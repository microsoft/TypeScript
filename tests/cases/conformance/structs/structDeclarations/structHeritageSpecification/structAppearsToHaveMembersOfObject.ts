struct C { foo: string; }

var c: C;
var r = c.toString(); // call members of JS Object
var r2 = c.hasOwnProperty('');
var o: Object = c; // error, not assignable
var o2: {} = c; // error, not assignable
