var x: string|number;
x.length; // error
var y = x.length; // error
x.len; // error
if (x.len) { } // error
var r1 = x.len && x; // error
var r2 = x.len || x; // error
var r3 = x.length && x.len; // error
var r4 = x.length && x.len && x.length; // error
var r5 = x.len ? x.len : x.len; // error
var r6 = !x.length; // error;
var r7 = !x.length && x.substr; // error
var r8 = !x.length || x.toFixed; // error