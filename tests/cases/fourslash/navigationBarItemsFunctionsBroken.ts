/// <reference path="fourslash.ts"/>

////function f() {
////    function; // This is not included as a navigation item, but it causes 'f' to be considered top-level.
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
        "childItems": [
            {
                "text": "<function>",
                "kind": "function"
            }
        ],
        "indent": 1
    }
]);
