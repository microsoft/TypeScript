/// <reference path="fourslash.ts" />

////const [|x = () => 0|];
////const f = [|function f() {}|];

const [s0, s1] = test.spans();
const sGlobal = { start: 0, length: 45 };

verify.navigationTree({
    text: "<global>",
    kind: "script",
    spans: [sGlobal],
    childItems: [
        {
            text: "f",
            kind: "function",
            spans: [s1],
        },
        {
            text: "x",
            kind: "const",
            spans: [s0],
        },
    ]
}, { checkSpans: true });

verify.navigationBar([
    {
        text: "<global>",
        kind: "script",
        spans: [sGlobal],
        childItems: [
            {
                text: "f",
                kind: "function",
                spans: [s1],
            },
            {
                text: "x",
                kind: "const",
                spans: [s0],
            },
        ],
    },
    {
        text: "f",
        kind: "function",
        spans: [s1],
        indent: 1,
    },
], { checkSpans: true });
