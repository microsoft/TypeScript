interface I {
    toString(): number;
}

declare var i: I;
declare var o: Object;
o = i; // error
i = o; // error

class C {
    toString(): number { return 1; }
}
declare var c: C;
o = c; // error
c = o; // error

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok