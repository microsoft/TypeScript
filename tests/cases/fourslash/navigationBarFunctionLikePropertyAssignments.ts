/// <reference path="fourslash.ts"/>

////var functions = {
////    a: 0,
////    b: function () { },
////    c: function x() { },
////    d: () => { },
////    e: y(),
////    f() { }
////};

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "functions",
            kind: "var",
            childItems: [
                {
                    text: "a",
                    kind: "property"
                },
                {
                    text: "b",
                    kind: "method"
                },
                {
                    text: "c",
                    kind: "method"
                },
                {
                    text: "d",
                    kind: "method"
                },
                {
                    text: "e",
                    kind: "property"
                },
                {
                    text: "f",
                    kind: "method"
                }
            ]
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "functions",
                "kind": "var"
            }
        ]
    },
    {
        "text": "functions",
        "kind": "var",
        "childItems": [
            {
                "text": "a",
                "kind": "property"
            },
            {
                "text": "b",
                "kind": "method"
            },
            {
                "text": "c",
                "kind": "method"
            },
            {
                "text": "d",
                "kind": "method"
            },
            {
                "text": "e",
                "kind": "property"
            },
            {
                "text": "f",
                "kind": "method"
            }
        ],
        "indent": 1
    }
]);