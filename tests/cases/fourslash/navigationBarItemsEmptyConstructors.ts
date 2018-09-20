/// <reference path="fourslash.ts"/>

////class Test {
////    constructor() {
////    }
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "Test",
            "kind": "class",
            "childItems": [
                {
                    "text": "constructor",
                    "kind": "constructor"
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
                "text": "Test",
                "kind": "class"
            }
        ]
    },
    {
        "text": "Test",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            }
        ],
        "indent": 1
    }
]);
