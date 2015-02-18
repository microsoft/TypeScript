//// [objectLiteralWithSemicolons5.ts]
var v = { foo() { }; a: b; get baz() { }; }

//// [objectLiteralWithSemicolons5.js]
var v = { foo: function () { }, a: b, get baz() { } };
