// @strict: true
// @noEmit: true

// Template literal type inference consumes one code point at a time, matching
// the string iterator (`[x, ..._] = s`) rather than UTF-16 code-unit indexing
// (`s[0]`). A supplementary code point is therefore kept whole rather than being
// split into its surrogate halves: Head<"😀abc"> is "😀" and Rest<"😀abc"> is
// "abc". This intentionally diverges from tsc, which advances one code unit at a
// time and yields the high surrogate "\uD83D".
type Head<S extends string> = S extends `${infer H}${infer _R}` ? H : never;
type Rest<S extends string> = S extends `${infer _H}${infer R}` ? R : never;

type H = Head<"\u{1F600}abc">;
type R = Rest<"\u{1F600}abc">;

const h: "\u{1F600}" = "x" as unknown as H;
const r: "abc" = "x" as unknown as R;

// Reassembling the head and rest reproduces the original string.
type Both = `${H}${R}`;
const both: "\u{1F600}abc" = "x" as unknown as Both;
