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

verify.completions(
    {
        marker: "i",
        exact: { name: "s", insertText: "[s]", replacementSpan: test.ranges()[0] },
        preferences: { includeInsertTextCompletions: true },
    },
    {
        marker: "j",
        exact: { name: "N.s2", insertText: "[N.s2]", replacementSpan: test.ranges()[1] },
        preferences: { includeInsertTextCompletions: true },
    }
);
