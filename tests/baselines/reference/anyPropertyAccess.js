//// [tests/cases/conformance/types/any/anyPropertyAccess.ts] ////

//// [anyPropertyAccess.ts]
var x: any;
var a = x.foo;
var b = x['foo'];
var c = x['fn']();
var d = x.bar.baz;
var e = x[0].foo;
var f = x['0'].bar;

//// [anyPropertyAccess.js]
var x;
var a = x.foo;
var b = x['foo'];
var c = x['fn']();
var d = x.bar.baz;
var e = x[0].foo;
var f = x['0'].bar;
