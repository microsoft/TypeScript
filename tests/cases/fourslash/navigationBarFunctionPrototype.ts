/// <reference path="fourslash.ts"/>

// @Filename: foo.js
////function f() {}
////f.prototype.x = 0;

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "f",
            "kind": "function"
        },
        {
            "text": "x",
            "kind": "property"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "f",
                "kind": "function"
            },
            {
                "text": "x",
                "kind": "property"
            }
        ]
    },
    {
        "text": "f",
        "kind": "function",
        "indent": 1
    }
]);
