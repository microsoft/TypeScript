enum E {
    A, B, C
}
enum Computed {
    A = 1 << 1,
    B = 1 << 2,
    C = 1 << 3,
}
let n: number;
let e: E = n; // error
e = 0; // ok, in range
e = 4; // error, out of range, allowed computed enums don't have all members
let a: E.A = 0; // ok, A === 0
a = 2; // error, 2 !== 0
a = n; // error

let c: Computed = n; // error
c = n; // error
c = 4; // error
let ca: Computed.A = 1; // error, Computed.A isn't a literal type because Computed has no enum literals
