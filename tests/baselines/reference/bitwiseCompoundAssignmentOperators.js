//// [bitwiseCompoundAssignmentOperators.ts]
var a = true;
var b = 1;
a ^= a;
a = true;
b ^= b;
b = 1;
a ^= b;
a = true;
b ^= a;
b = 1;

var c = false;
var d = 2;
c &= c;
c = false;
d &= d;
d = 2;
c &= d;
c = false;
d &= c;

var e = true;
var f = 0;
e |= e;
e = true;
f |= f;
f = 0;
e |= f;
e = true;
f |= f;



//// [bitwiseCompoundAssignmentOperators.js]
var a = true;
var b = 1;
a ^= a;
a = true;
b ^= b;
b = 1;
a ^= b;
a = true;
b ^= a;
b = 1;
var c = false;
var d = 2;
c &= c;
c = false;
d &= d;
d = 2;
c &= d;
c = false;
d &= c;
var e = true;
var f = 0;
e |= e;
e = true;
f |= f;
f = 0;
e |= f;
e = true;
f |= f;
