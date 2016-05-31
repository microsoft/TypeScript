/// <reference path="fourslash.ts"/>

////function;
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
        ]
    },
    {
        "text": "f",
        "kind": "function",
        "indent": 1
    }
]);
