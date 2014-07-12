//// [methodSignaturesWithOverloads2.js]
// Object type literals permit overloads with optionality but they must match
var c;

// no errors
c.func4 = c.func5;
c.func5 = c.func4;

var c2;

// no errors
c2.func4 = c2.func5;
c2.func5 = c2.func4;
