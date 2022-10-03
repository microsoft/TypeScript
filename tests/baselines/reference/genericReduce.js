//// [genericReduce.ts]
var a = ["An", "array", "of", "strings"];
var b = a.map(s => s.length);
var n1 = b.reduce((x, y) => x + y);
var n2 = b.reduceRight((x, y) => x + y);

n1.x = "fail";       // should error, as 'n1' should be type 'number', not 'any'.
n1.toExponential(2); // should not error if 'n1' is correctly number.
n2.x = "fail";       // should error, as 'n2' should be type 'number', not 'any'.
n2.toExponential(2); // should not error if 'n2' is correctly number.

var n3 = b.reduce<string>( (x, y) => x + y, ""); // Initial value is of type string
n3.toExponential(2); // should error if 'n3' is correctly type 'string'
n3.charAt(0);        // should not error if 'n3' is correctly type 'string'

//// [genericReduce.js]
var a = ["An", "array", "of", "strings"];
var b = a.map(function (s) { return s.length; });
var n1 = b.reduce(function (x, y) { return x + y; });
var n2 = b.reduceRight(function (x, y) { return x + y; });
n1.x = "fail"; // should error, as 'n1' should be type 'number', not 'any'.
n1.toExponential(2); // should not error if 'n1' is correctly number.
n2.x = "fail"; // should error, as 'n2' should be type 'number', not 'any'.
n2.toExponential(2); // should not error if 'n2' is correctly number.
var n3 = b.reduce(function (x, y) { return x + y; }, ""); // Initial value is of type string
n3.toExponential(2); // should error if 'n3' is correctly type 'string'
n3.charAt(0); // should not error if 'n3' is correctly type 'string'
