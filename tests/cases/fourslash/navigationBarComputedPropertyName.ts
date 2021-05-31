/// <reference path="fourslash.ts"/>

////function F(key, value) {
////    return {
////        [key]: value,
////        "prop": true
////    }
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "F",
            "kind": "function",
            "childItems": [
                {
                    "text": "[key]",
                    "kind": "property"
                },
                {
                    "text": "\"prop\"",
                    "kind": "property"
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
                "text": "F",
                "kind": "function"
            }
        ]
    },
    {
        "text": "F",
        "kind": "function",
        "childItems": [
            {
                "text": "[key]",
                "kind": "property"
            },
            {
                "text": "\"prop\"",
                "kind": "property"
            }
        ],
        "indent": 1
    }
]);
