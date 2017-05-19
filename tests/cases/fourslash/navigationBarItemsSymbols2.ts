/// <reference path="fourslash.ts"/>

////interface I {
////    [Symbol.isRegExp]: string;
////    [Symbol.iterator](): string;
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "I",
            "kind": "interface",
            "childItems": [
                {
                    "text": "[Symbol.isRegExp]",
                    "kind": "property"
                },
                {
                    "text": "[Symbol.iterator]",
                    "kind": "method"
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
                "text": "I",
                "kind": "interface"
            }
        ]
    },
    {
        "text": "I",
        "kind": "interface",
        "childItems": [
            {
                "text": "[Symbol.isRegExp]",
                "kind": "property"
            },
            {
                "text": "[Symbol.iterator]",
                "kind": "method"
            }
        ],
        "indent": 1
    }
]);
