// @strict: true
// @noEmit: true

// Negated types used with intrinsic string mapping types.

// Uppercase applied to a negated type: `Uppercase<not T>`.
type U1 = Uppercase<not "bar">;
type U2 = Uppercase<not string>;
type U3 = Uppercase<not ("a" | "b")>;
type U4 = Uppercase<string & not "bar">;

// Negation applied to a string mapping type: `not Uppercase<T>`.
type N1 = not Uppercase<"bar">;
type N2 = not Uppercase<string>;
type N3 = not Lowercase<"ABC">;

// Generic forms.
type MapUpper<T extends string> = Uppercase<T & not "bar">;
type MapUpperString = MapUpper<string>;
type MapUpperLiteral = MapUpper<"baz">;

type NegUpper<T extends string> = not Uppercase<T>;
type NegUpperString = NegUpper<string>;
type NegUpperLiteral = NegUpper<"baz">;

// Assignability probes.
declare let u1: U1;
declare let n1: N1;

u1 = "BAZ"; // depends on representation
u1 = "baz"; // depends on representation

n1 = "baz"; // depends on representation
n1 = "BAR"; // depends on representation
