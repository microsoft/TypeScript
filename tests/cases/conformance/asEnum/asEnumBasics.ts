// Enum without initializers have first member = 0 and successive members = N + 1

// `as enum` does not introduce auto-incrementing behaviour.
let ExistingShorthand = "exists";
const E1: enum = {
    NonexistingShorthand, // error
    ExistingShorthand, // ok
    Int: 1, // ok
    String: "string", // ok
};

// Valid assignments
const nonexist: E1 = E1.NonexistingShorthand; // ok
const exist: E1 = E1.ExistingShorthand; // ok
const ival: E1 = E1.Int; // ok
const sval: E1 = E1.String; // ok

// Assigning values which are not part of the enum despite being present in the enum
const nonexist_bad: E1 = undefined; // error
const exist_bad: E1 = "exists"; // error
const ival_bad: E1 = 1; // error
const sval_bad: E1 = "string"; // error

// Assigning values which are not present in the enum
const ival_bad2: E1 = 4; // error
const sval_bad2: E1 = "not string"; // error