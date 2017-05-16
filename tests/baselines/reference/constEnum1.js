//// [constEnum1.ts]
// An enum declaration that specifies a const modifier is a constant enum declaration.
// In a constant enum declaration, all members must have constant values and
// it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.

const enum E {
    a = 10,
    b = a,
    c = (a+1),
    e,
    d = ~e,
    f = a << 2 >> 1,
    g = a << 2 >>> 1,
    h = a | b
}

//// [constEnum1.js]
// An enum declaration that specifies a const modifier is a constant enum declaration.
// In a constant enum declaration, all members must have constant values and
// it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.


//// [constEnum1.d.ts]
declare const enum E {
    a = 10,
    b = a, /* 10 */
    c = (a+1), /* 11 */
    e = 12,
    d = ~e, /* -13 */
    f = a << 2 >> 1, /* 20 */
    g = a << 2 >>> 1, /* 20 */
    h = a | b, /* 10 */
}
