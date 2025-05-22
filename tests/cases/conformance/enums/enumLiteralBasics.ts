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
let p_int: E1.Int = E1.Int; // ok
const p_nonexist: E1.NonexistingShorthand = E1.NonexistingShorthand; // ok
const p_exist: E1.ExistingShorthand = E1.ExistingShorthand; // ok
const p_string: E1.String = E1.String; // ok
p_int = E1.Flag; // Type 'E1.Flag' is not assignable to type 'E1.Int'.
p_int = E1.Int | E1.Flag;

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

function functest2(value: E1.Int) {
    console.log(value);
    return value;
}

const nonexist_bad3: E1.Int = functest2(undefined);
const exist_bad3: E1.Int = functest2("exists"); // error
const ival_good5: E1.Int = functest2(1); // ok
const ival_good6: E1.Int = functest2(4); // ok
const ival_good7: E1.Int = functest2(E1.Int | E1.Flag); // ok
const sval_good3: E1.Int = functest2(E1.String);
const sval_bad3: E1.Flag = functest2("string"); // error