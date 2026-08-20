// @strict: true
// @noEmit: true

// Template literal type inference over a string containing a lone surrogate
// should preserve the surrogate, matching tsc. This baseline verifies the
// inferred lone surrogate is preserved rather than corrupted to U+FFFD.
type Head<S extends string> = S extends `${infer H}${infer _R}` ? H : never;
type Rest<S extends string> = S extends `${infer _H}${infer R}` ? R : never;

type H = Head<"\uD800abc">;
type R = Rest<"\uD800abc">;

const h: "\uD800" = "x" as unknown as H;
const r: "abc" = "x" as unknown as R;
