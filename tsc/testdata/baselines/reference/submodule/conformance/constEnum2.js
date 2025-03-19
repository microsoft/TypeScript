//// [tests/cases/conformance/constEnums/constEnum2.ts] ////

//// [constEnum2.ts]
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

//// [constEnum2.js]
// An enum declaration that specifies a const modifier is a constant enum declaration.
// In a constant enum declaration, all members must have constant values and
// it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.
// Error : not a constant enum expression
const CONST = 9000 % 2;
var D;
(function (D) {
    D[D["d"] = 10] = "d";
    D["e"] = 199 * Math.floor(Math.random() * 1000);
    if (typeof D.e !== "string") D[D.e] = "e";
    D["f"] = D.d - (100 * Math.floor(Math.random() % 8));
    if (typeof D.f !== "string") D[D.f] = "f";
    D["g"] = CONST;
    if (typeof D.g !== "string") D[D.g] = "g";
})(D || (D = {}));
