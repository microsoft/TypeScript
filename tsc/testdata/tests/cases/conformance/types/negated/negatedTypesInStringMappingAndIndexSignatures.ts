// @strict: true
// @noEmit: true

// Combination: negated types with BOTH string mapping types and index signatures.

// Index signature whose key is a string mapping of a negated type.
type UpperKey = {
    [idx: Uppercase<string & not "bar">]: number;
};

declare let upperKey: UpperKey;
upperKey["FOO"] = 1; // depends on representation
upperKey["foo"] = 1; // depends on representation

// Index signature whose key is a negation of a string mapping type.
type NotUpperKey = {
    [idx: string & not Uppercase<string>]: number;
};

declare let notUpperKey: NotUpperKey;
notUpperKey["foo"] = 1; // depends on representation
notUpperKey["FOO"] = 1; // depends on representation

// Mapped type over a string-mapping key type that uses a negated placeholder.
type MappedUpper = {
    [k in Uppercase<string & not "bar">]: number;
};

// Generic index signature combination.
type WrapUpperKey<T extends string> = {
    [idx: Uppercase<T & not "bar">]: number;
};
type WrapUpperKeyString = WrapUpperKey<string>;
type WrapUpperKeyLiteral = WrapUpperKey<"baz">;
