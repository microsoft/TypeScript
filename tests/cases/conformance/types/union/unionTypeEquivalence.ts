// A | B is equivalent to A if B is a subtype of A
class C { }
class D extends C { foo() { } }
var x: C;
var x : C | D;

// A | B is equivalent to B | A.
var y: string | number;
var y : number | string;

// AB | C is equivalent to A | BC, where AB is A | B and BC is B | C.
var z : string | number | boolean;
var z : (string | number) | boolean;
var z : string | (number | boolean);
var AB : string | number;
var BC : number | boolean;
var z1: typeof AB | boolean;
var z1: string | typeof BC;
