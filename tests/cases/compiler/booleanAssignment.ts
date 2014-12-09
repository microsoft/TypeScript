var b = new Boolean();
b = 1; // Error
b = "a"; // Error
b = {}; // Error

var o = {};
o = b; // OK

b = true; // OK

var b2:boolean;
b = b2; // OK