/// <reference path="fourslash.ts"/>

////const o = {
////    a: {
////        m() {},
////    },
////    b: {
////        m() {},
////    },
////}

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "o",
            kind: "const",
            childItems: [
                { text: "m", kind: "method" },
                { text: "m", kind: "method" },
            ],
        },
    ]
});

verify.navigationBar([
    {
        text: "<global>",
        kind: "script",
        childItems: [
            { text: "o", kind: "const" },
        ],
    },
    {
        text: "o",
        kind: "const",
        childItems: [
            { text: "m", kind: "method" },
            { text: "m", kind: "method" },
        ],
        indent: 1,
    },
]);
