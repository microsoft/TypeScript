interface I {
    toString(): void;
}

declare var i: I;
declare var o: Object;
o = i; // error
i = o; // ok

class C {
    toString(): void { }
}
declare var c: C;
o = c; // error
c = o; // ok

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok