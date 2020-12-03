/// <reference path='fourslash.ts'/> 
////'use strict'
////const a = {
////    ...b,
////    c,
////    d: 0
////};

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "a",
            kind: "const",
            childItems: [
                {
                    text: "b",
                    kind: "property",
                },
                {
                    text: "c",
                    kind: "property"
                },
                {
                    text: "d",
                    kind: "property"
                }
            ]
        }
    ]
});

verify.navigationBar([
    {
        text: "<global>",
        kind: "script",
        childItems: [
            {
                text: "a",
                kind: "const"
            }
        ]
    },
    {
        text: "a",
        kind: "const",
        childItems: [
            {
                text: "b",
                kind: "property",
            },
            {
                text: "c",
                kind: "property"
            },
            {
                text: "d",
                kind: "property"
            }
        ],
        indent: 1
    }
]);
