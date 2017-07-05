/// <reference path="fourslash.ts"/>

////class C {
////    [Symbol.isRegExp] = 0;
////    [Symbol.iterator]() { }
////    get [Symbol.isConcatSpreadable]() { }
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
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
                "text": "[Symbol.isConcatSpreadable]",
                "kind": "getter"
            },
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
