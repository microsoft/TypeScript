// @strict: true
// @noEmit: true

// Combination: negated types with pattern literal types, string mapping types, AND index signatures.

// Index signature whose key is a string mapping of a template literal containing a negated placeholder.
type AllCombined = {
    [idx: Uppercase<`foo${string & not "bar"}`>]: number;
};

declare let allCombined: AllCombined;
allCombined["FOOBAZ"] = 1; // depends on representation
allCombined["foobaz"] = 1; // depends on representation
allCombined["FOOBAR"] = 1; // depends on representation

// Index signature whose key is a template literal whose placeholder is a string mapping of a negated type.
type AllCombined2 = {
    [idx: `foo${Uppercase<string & not "bar">}`]: number;
};

declare let allCombined2: AllCombined2;
allCombined2["fooBAZ"] = 1; // depends on representation
allCombined2["foobaz"] = 1; // depends on representation

// Mapped type form combining all three.
type MappedAll = {
    [k in Uppercase<`foo${string & not "bar"}`>]: number;
};

// Generic composition of all three.
type WrapAll<T extends string> = {
    [idx: Uppercase<`foo${T & not "bar"}`>]: number;
};
type WrapAllString = WrapAll<string>;
type WrapAllLiteral = WrapAll<"baz">;
