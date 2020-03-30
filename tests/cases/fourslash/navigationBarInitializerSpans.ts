/// <reference path="fourslash.ts" />

////// get the name for the navbar from the variable name rather than the function name
////const [|[|x|] = () => { var [|a|]; }|];
////const [|[|f|] = function f() { var [|b|]; }|];
////const [|[|y|] = { [|[|z|]: function z() { var [|c|]; }|] }|];

const [
    s0,
    s0Name,
    s0Child,
    s1, 
    s1Name, 
    s1Child, 
    s2, 
    s2Name, 
    s2Child, 
    s2ChildName, 
    s2GrandChildName
] = test.spans();

const sGlobal = { start: 0, length: 188 };

verify.navigationTree({
    text: "<global>",
    kind: "script",
    spans: [sGlobal],
    childItems: [
        {
            text: "f",
            kind: "const",
            spans: [s1],
            nameSpan: s1Name,
            childItems: [
                {
                    text: "b",
                    kind: "var",
                    spans: [s1Child],
                    nameSpan: s1Child,
                },
            ],
        },
        {
            text: "x",
            kind: "const",
            spans: [s0],
            nameSpan: s0Name,
            childItems: [
                {
                    text: "a",
                    kind: "var",
                    spans: [s0Child],
                    nameSpan: s0Child,
                },
            ],
        },
        {
            text: "y",
            kind: "const",
            spans: [s2],
            nameSpan: s2Name,
            childItems:[
                {
                    text: "z",
                    kind: "method",
                    spans: [s2Child],
                    nameSpan: s2ChildName,
                    childItems: [
                        {
                            text: "c",
                            kind: "var",
                            spans: [s2GrandChildName],
                            nameSpan: s2GrandChildName,
                        },
                    ],
                },
            ],
        }
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
                kind: "const",
                spans: [s1],
            },
            {
                text: "x",
                kind: "const",
                spans: [s0],
            },
            {
                text: "y",
                kind: "const",
                spans: [s2],
            }
        ],
    },
    {
        text: "f",
        kind: "const",
        spans: [s1],
        childItems: [
            {
                text: "b",
                kind: "var",
                spans: [s1Child],
            },
        ],
        indent: 1,
    },
    {
        text: "x",
        kind: "const",
        spans: [s0],
        childItems: [
            {
                text: "a",
                kind: "var",
                spans: [s0Child],
            },
        ],
        indent: 1,
    },
    {
        text: "y",
        kind: "const",
        spans: [s2],
        childItems: [
            {
                text: "z",
                kind: "method",
                spans: [s2Child],
            },
        ],
        indent: 1,
    },
    {
        text: "z",
        kind: "method",
        spans: [s2Child],
        childItems: [
            {
                text: "c",
                kind: "var",
                spans: [s2GrandChildName],
            },
        ],
        indent: 2,
    },
], { checkSpans: true });
