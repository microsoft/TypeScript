// @strict: true
// @noEmit: true

// Combination: negated types with BOTH pattern literal types and string mapping types.

// String mapping wrapping a template literal that contains a negated placeholder.
type UpperTemplate = Uppercase<`foo${string & not "bar"}`>;

// Template literal whose placeholder is a string mapping of a negated type.
type TemplateUpper = `foo${Uppercase<string & not "bar">}`;

// Template literal whose placeholder is a negation of a string mapping type.
type TemplateNotUpper = `foo${not Uppercase<"BAR">}`;

// Negation of a template literal that contains a string mapping placeholder.
type NotTemplateUpper = not `foo${Uppercase<string>}`;

// Generic composition.
type Compose<T extends string> = Uppercase<`foo${T & not "bar"}`>;
type ComposeString = Compose<string>;
type ComposeLiteral = Compose<"baz">;
type ComposeBar = Compose<"bar">;

// Assignability probes.
declare let upperTemplate: UpperTemplate;
declare let templateUpper: TemplateUpper;

upperTemplate = "FOOBAZ"; // depends on representation
upperTemplate = "foobaz"; // depends on representation
templateUpper = "fooBAZ"; // depends on representation
templateUpper = "foobar"; // depends on representation
