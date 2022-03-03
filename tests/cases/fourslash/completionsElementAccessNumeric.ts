/// <reference path="fourslash.ts" />

// @target: esnext

////type Tup = [
////    /**
////     * The first label
////     */
////    lbl1: number,
////    /**
////     * The second label
////     */
////    lbl2: number
////];
////declare var x: Tup;
////x[|./**/|]

const replacementSpan = test.ranges()[0];
verify.completions(
    {
        marker: "",
        includes: [
            {name: "0", insertText: "[0]", replacementSpan, documentation: "The first label", text: "(property) 0: number (lbl1)" },
            {name: "1", insertText: "[1]", replacementSpan, documentation: "The second label", text: "(property) 1: number (lbl2)" },
        ],
        preferences: {
            includeInsertTextCompletions: true,
        },
    },
);
