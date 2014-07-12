interface I {}
class AAA implements I { }
var x: number;
x.toString();
var i: I;
i.toString(); // used to be an error
var c: AAA;
c.toString(); // used to be an error
