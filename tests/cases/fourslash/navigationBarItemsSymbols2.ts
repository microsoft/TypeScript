/// <reference path="fourslash.ts"/>

////interface I {
////    [Symbol.isRegExp]: string;
////    [Symbol.iterator](): string;
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
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
