/// <reference path="fourslash.ts"/>

////// Should not merge grandchildren with property assignments
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
                { 
                    text: "a",
                    kind: "property",
                    childItems: [
                        { text: "m", kind: "method" }
                    ]
                },
                { 
                    text: "b",
                    kind: "property",
                    childItems: [
                        { text: "m", kind: "method" }
                    ]
                },
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
            { text: "a", kind: "property" },
            { text: "b", kind: "property" },
        ],
        indent: 1,
    },
    {
        text: "a",
        kind: "property",
        childItems: [
            { text: "m", kind: "method" },
        ],
        indent: 2,
    },
    {
        text: "b",
        kind: "property",
        childItems: [
            { text: "m", kind: "method" },
        ],
        indent: 2,
    },

]);
