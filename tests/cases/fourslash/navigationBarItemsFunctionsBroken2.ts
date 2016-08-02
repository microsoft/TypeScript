/// <reference path="fourslash.ts"/>

////function;
////function f() {
////    function;
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "<function>",
                "kind": "function"
            },
            {
                "text": "f",
                "kind": "function"
            }
        ]
    },
    {
        "text": "f",
        "kind": "function",
        "childItems": [
            {
                "text": "<function>",
                "kind": "function"
            }
        ],
        "indent": 1
    }
]);
