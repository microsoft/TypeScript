/// <reference path="fourslash.ts" />

////class X {
////    get x() {}
////    set x(value) {
////        // Inner declaration should make the setter top-level.
////        function f() {}
////    }
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "X",
                "kind": "class"
            }
        ]
    },
    {
        "text": "X",
        "kind": "class",
        "childItems": [
            {
                "text": "x",
                "kind": "getter"
            },
            {
                "text": "x",
                "kind": "setter"
            }
        ],
        "indent": 1
    },
    {
        "text": "x",
        "kind": "setter",
        "childItems": [
            {
                "text": "f",
                "kind": "function"
            }
        ],
        "indent": 2
    }
]);
