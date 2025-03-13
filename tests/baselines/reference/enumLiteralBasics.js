//// [tests/cases/conformance/enums/enumLiteralBasics.ts] ////

//// [enumLiteralBasics.ts]
// Enum without initializers have first member = 0 and successive members = N + 1

// Enum literal syntax does not implement auto-incrementing behaviour.
let ExistingShorthand = "exists";
const E1: enum = {
    NonexistingShorthand, // error -- EnumLiteralExpressions require explicit property definitions.
    ExistingShorthand, // error -- EnumLiteralExpressions require explicit property definitions.
    Int: 1, // ok
    String: "string", // ok
    Flag: 8, // ok
};

// Valid assignments
const nonexist: E1 = E1.NonexistingShorthand; // ok
const exist: E1 = E1.ExistingShorthand; // ok
const ival: E1 = E1.Int; // ok
const sval: E1 = E1.String; // ok

// Assigning values which are not part of the enum despite being present in the enum
const nonexist_bad: E1 = undefined; // error
const exist_bad: E1 = "exists"; // error
const ival_good: E1 = 1; // ok -- TypeScript is permissive of this in enums, to permit things like bitwise combinations of enum values.
const sval_bad: E1 = "string"; // error

const ival_notpresent: E1 = 4; // ok -- TypeScript is permissive of this in enums, to permit things like bitwise combinations of enum values.

function functest(value: E1) {
    console.log(value);
    return value;
}

const nonexist_bad2: E1 = functest(undefined); // error
const exist_bad2: E1 = functest("exists"); // error
const ival_good2: E1 = functest(1); // ok
const ival_good3: E1 = functest(4); // ok
const ival_good4: E1 = functest(E1.Int | E1.Flag); // ok
const sval_good2: E1 = functest(E1.String);
const sval_bad2: E1 = functest("string"); // error


//// [enumLiteralBasics.js]
// Enum without initializers have first member = 0 and successive members = N + 1
// Enum literal syntax does not implement auto-incrementing behaviour.
var ExistingShorthand = "exists";
var E1 = {
    NonexistingShorthand: NonexistingShorthand// Enum without initializers have first member = 0 and successive members = N + 1
    // Enum literal syntax does not implement auto-incrementing behaviour.
    , // Enum without initializers have first member = 0 and successive members = N + 1
    ExistingShorthand: ExistingShorthand// Enum without initializers have first member = 0 and successive members = N + 1
    // Enum literal syntax does not implement auto-incrementing behaviour.
    , // Enum without initializers have first member = 0 and successive members = N + 1
    Int: 1// Enum without initializers have first member = 0 and successive members = N + 1
    // Enum literal syntax does not implement auto-incrementing behaviour.
    , // Enum without initializers have first member = 0 and successive members = N + 1
    String: "string"// Enum without initializers have first member = 0 and successive members = N + 1
    // Enum literal syntax does not implement auto-incrementing behaviour.
    , // Enum without initializers have first member = 0 and successive members = N + 1
    Flag: 8// Enum without initializers have first member = 0 and successive members = N + 1
    // Enum literal syntax does not implement auto-incrementing behaviour.
};
// Valid assignments
var nonexist = E1.NonexistingShorthand; // ok
var exist = E1.ExistingShorthand; // ok
var ival = E1.Int; // ok
var sval = E1.String; // ok
// Assigning values which are not part of the enum despite being present in the enum
var nonexist_bad = undefined; // error
var exist_bad = "exists"; // error
var ival_good = 1; // ok -- TypeScript is permissive of this in enums, to permit things like bitwise combinations of enum values.
var sval_bad = "string"; // error
var ival_notpresent = 4; // ok -- TypeScript is permissive of this in enums, to permit things like bitwise combinations of enum values.
function functest(value) {
    console.log(value);
    return value;
}
var nonexist_bad2 = functest(undefined); // error
var exist_bad2 = functest("exists"); // error
var ival_good2 = functest(1); // ok
var ival_good3 = functest(4); // ok
var ival_good4 = functest(E1.Int | E1.Flag); // ok
var sval_good2 = functest(E1.String);
var sval_bad2 = functest("string"); // error
