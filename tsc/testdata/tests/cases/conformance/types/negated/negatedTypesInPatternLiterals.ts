// @strict: true
// @noEmit: true

// Negated types used as placeholders inside template/pattern literal types.

// A negated string literal as a placeholder.
type NotBar = `foo${not "bar"}`;

// A negated primitive as a placeholder.
type NotString = `foo${not string}`;
type NotNumber = `id-${not 0}`;

// A negated union as a placeholder.
type NotAB = `x-${not ("a" | "b")}`;

// A negated type intersected with a string, which restricts to string values.
type StringNotBar = `foo${string & not "bar"}`;

// A generic negated placeholder.
type Wrap<T> = `foo${T & not "bar"}`;
type WrapString = Wrap<string>;
type WrapLiteral = Wrap<"baz">;
type WrapBar = Wrap<"bar">;

// Assignability against a plainly-typed string.
declare let notBar: NotBar;
declare let stringNotBar: StringNotBar;

notBar = "foobaz";      // depends on representation
notBar = "foobar";      // depends on representation
stringNotBar = "foobaz"; // depends on representation
stringNotBar = "foobar"; // depends on representation

// Inference from a template literal pattern with a negated placeholder.
declare function parse<T extends string>(s: `foo${T & not "bar"}`): T;
const p1 = parse("foobaz");
const p2 = parse("foobar");
