// @declaration: true

// An enum declaration that specifies a const modifier is a constant enum declaration.
// In a constant enum declaration, all members must have constant values and
// it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.

// Error : not a constant enum expression

const CONST = 9000 % 2;
const enum D {
    d = 10,
    e = 199 * Math.floor(Math.random() * 1000),
    f = d - (100 * Math.floor(Math.random() % 8)),
    g = CONST,
}