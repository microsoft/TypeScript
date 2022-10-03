interface I {
    toString(): void;
}

var i: I;
var o: Object;
o = i; // error
i = o; // ok

class C {
    toString(): void { }
}
var c: C;
o = c; // error
c = o; // ok

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok