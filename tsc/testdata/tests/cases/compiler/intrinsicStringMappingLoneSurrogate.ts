// @strict: true
// @noEmit: true

// Intrinsic string mapping types should preserve lone surrogates, matching tsc.
// Currently tsgo corrupts them to U+FFFD; this baseline documents that behavior.
// (Fix tracked separately alongside other intrinsic string mapping work.)
type U = Uppercase<"\uD800">;
type L = Lowercase<"A\uD800B">;
type C = Capitalize<"\uDC00x">;
type Un = Uncapitalize<"\uD834X">;

const u: "\uD800" = "x" as unknown as U;
const l: "a\uD800b" = "x" as unknown as L;
