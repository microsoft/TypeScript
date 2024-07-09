/// <reference path="fourslash.ts"/>

////class C {
////    [Symbol.isRegExp] = 0;
////    [Symbol.iterator]() { }
////    get [Symbol.isConcatSpreadable]() { }
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "C",
            "kind": "class",
            "childItems": [
                {
                    "text": "[Symbol.isRegExp]",
                    "kind": "property"
                },
                {
                    "text": "[Symbol.iterator]",
                    "kind": "method"
                },
                {
                    "text": "[Symbol.isConcatSpreadable]",
                    "kind": "getter"
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
                "text": "C",
                "kind": "class"
            }
        ]
    },
    {
        "text": "C",
        "kind": "class",
        "childItems": [
            {
                "text": "[Symbol.isRegExp]",
                "kind": "property"
            },
            {
                "text": "[Symbol.iterator]",
                "kind": "method"
            },
            {
                "text": "[Symbol.isConcatSpreadable]",
                "kind": "getter"
            }
        ],
        "indent": 1
    }
]);
