// @strict: true
// @noEmit: true

// Matching actual string literal types against pattern literal types that
// contain negated holes. `"foobaz"` should match `foo${string & not "bar"}`
// but `"foobar"` should not, because the hole excludes exactly "bar".

type Pattern = `foo${string & not "bar"}`;

// Direct assignment of literals to the pattern type.
declare let pat: Pattern;
pat = "foobaz"; // should be ok
pat = "foobar"; // should error
pat = "foo";    // should be ok (the hole can match the empty string)
pat = "baz";    // should error (missing "foo" prefix)

// Assignability from a literal-typed value.
declare const foobaz: "foobaz";
declare const foobar: "foobar";
pat = foobaz; // should be ok
pat = foobar; // should error

// Matching via a conditional type (extends check).
type MatchFoobaz = "foobaz" extends Pattern ? true : false; // should be true
type MatchFoobar = "foobar" extends Pattern ? true : false; // should be false

// Matching a union of literals: only the members that don't collapse the hole
// to never should be retained.
type FilterMatches<T> = T extends Pattern ? T : never;
type Filtered = FilterMatches<"foobaz" | "foobar" | "fooqux">; // should be "foobaz" | "fooqux"

// Inference through a generic function whose parameter is the pattern.
declare function take<T extends string>(s: `foo${T & not "bar"}`): T;
const okBaz = take("foobaz"); // should be ok, T = "baz"
const errBar = take("foobar"); // should error, "bar" is excluded

// Excluding a union of holes.
type Pattern2 = `foo${string & not ("bar" | "qux")}`;
declare let pat2: Pattern2;
pat2 = "foobaz"; // should be ok
pat2 = "foobar"; // should error
pat2 = "fooqux"; // should error
