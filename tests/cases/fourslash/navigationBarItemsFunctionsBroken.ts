/// <reference path="fourslash.ts"/>

////function f() {
////    function;
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "f",
                "kind": "function"
            }
        ],
        "indent": 0
    },
    {
        "text": "f",
        "kind": "function",
        "childItems": [],
        "indent": 1
    }
]);
