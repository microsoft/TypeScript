//// [constEnum2.ts]
// An enum declaration that specifies a const modifier is a constant enum declaration.
// In a constant enum declaration, all members must have constant values and
// it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.

// Error : not a constant enum expression

const CONST = 9000 % 2;
const enum D {
    d = 10,
    e = 199 * Math.floor(Math.random() * 1000),
    f = d - (100 * Math.floor(Math.random() % 8))
    g = CONST,
}

//// [constEnum2.js]
// An enum declaration that specifies a const modifier is a constant enum declaration.
// In a constant enum declaration, all members must have constant values and
// it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.
// Error : not a constant enum expression
var CONST = 9000 % 2;


//// [constEnum2.d.ts]
declare const CONST: number;
declare const enum D {
    d = 10,
    e,
    f,
    g
}
