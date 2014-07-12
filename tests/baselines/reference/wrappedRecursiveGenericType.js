//// [wrappedRecursiveGenericType.js]
var x;
x.val = 5; // val -> number
x.a.val = 5; // val -> number
x.a.b.val = 5; // val -> X<number> (This should be an error)
x.a.b.a.val = 5; // val -> X<number> (This should be an error)
