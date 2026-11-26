// @strict: true
// @noEmit: true

// Combination: negated types with BOTH pattern literal types and index signatures.

// Index signature whose key is a template literal containing a negated placeholder.
type TemplateKey = {
    [idx: `foo${string & not "bar"}`]: number;
};

declare let templateKey: TemplateKey;
templateKey["foobaz"] = 1; // matches pattern
templateKey["foobar"] = 1; // excluded by negation
templateKey["baz"] = 1;    // does not match pattern

// Index signature whose key is a bare negated template literal.
type NotTemplateKey = {
    [idx: not `foo${string}`]: number;
};

// Mapped type over a template literal key type that uses a negated placeholder.
type MappedTemplate = {
    [k in `foo${string & not "bar"}`]: number;
};

// Generic index signature combination.
type WrapKey<T extends string> = {
    [idx: `foo${T & not "bar"}`]: number;
};
type WrapKeyString = WrapKey<string>;
type WrapKeyLiteral = WrapKey<"baz">;
