//// [functionLiterals.js]
// PropName<TypeParamList>(ParamList):ReturnType is equivalent to PropName: { <TypeParamList>(ParamList): ReturnType }
var b;

// no errors
b.func1 = b.func2;
b.func1 = b.func3;
b.func2 = b.func1;
b.func2 = b.func3;
b.func3 = b.func1;
b.func3 = b.func2;

var c;

// no errors
c.func4 = c.func5;
c.func5 = c.func4;

// generic versions
var b2;

// no errors
b2.func1 = b2.func2;
b2.func1 = b2.func3;
b2.func2 = b2.func1;
b2.func2 = b2.func3;
b2.func3 = b2.func1;
b2.func3 = b2.func2;

var c2;

// no errors
c2.func4 = c2.func5;
c2.func5 = c2.func4;
