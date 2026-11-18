// @strict: true
// @noEmit: true

declare const o: { p: "a" | "b" } | undefined;

const { p } = o ?? { p: "d" };
const { p: q } = o || { p: "d" };
