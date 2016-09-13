enum E {
    A, B, C
}
enum Computed {
    A = 1 << 1,
    B = 1 << 2,
    C = 1 << 3,
}
let n: number;
let e: E = n; // ok because it's too inconvenient otherwise
e = 0; // ok, in range
e = 4; // ok, out of range, but allowed computed enums don't have all members
let a: E.A = 0; // ok, A === 0
a = 2; // error, 2 !== 0
a = n; // ok

let c: Computed = n; // ok
c = n; // ok
c = 4; // ok
let ca: Computed.A = 1; // error, Computed.A isn't a literal type because Computed has no enum literals



