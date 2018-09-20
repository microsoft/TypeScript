/// <reference path="fourslash.ts" />

////declare const Symbol: (s: string) => symbol;
////const s = Symbol("s");
////interface I { [s]: number };
////declare const i: I;
////i[|./*i*/|];
////
////namespace N { export const s2 = Symbol("s2"); }
////interface J { [N.s2]: number; }
////declare const j: J;
////j[|./*j*/|];

verify.completionsAt("i", [{ name: "s", insertText: "[s]", replacementSpan: test.ranges()[0] }], { includeInsertTextCompletions: true });
verify.completionsAt("j", [{ name: "N", insertText: "[N]", replacementSpan: test.ranges()[1] }], { includeInsertTextCompletions: true })
