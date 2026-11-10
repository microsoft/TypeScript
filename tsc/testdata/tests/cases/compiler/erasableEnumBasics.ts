// @strict: true

const existingValue = "exists";
const E: enum = {
    Existing: existingValue,
    Int: 1,
    String: "string",
    Flag: 8,
};

// Members are assignable to their enum type and their own member type.
let value: E = E.Existing;
value = E.Int;
value = E.String;
let intMember: E.Int = E.Int;
intMember = E.Flag; // error: a different known member.

// Matching numeric literals are accepted, but other known literals are rejected.
value = 1;
value = 4; // error

// String members retain nominal types, including values from constant references.
value = "exists"; // error
value = "string"; // error
const Other: enum = { String: "string" };
value = Other.String; // error: members from different enums are incompatible.
let other: Other = Other.String;
other = "string"; // error: a single-member enum is also nominal.
other = E.String; // error
value = undefined; // error

// Number expressions retain TypeScript's numeric enum compatibility.
value = E.Int | E.Flag;
intMember = E.Int | E.Flag;
