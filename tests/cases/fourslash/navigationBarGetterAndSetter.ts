/// <reference path="fourslash.ts" />

////class X {
////    get x() {}
////    set x(value) {
////        // Inner declaration should make the setter top-level.
////        function f() {}
////    }
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
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
                    "kind": "setter",
                    "childItems": [
                        {
                            "text": "f",
                            "kind": "function"
                        }
                    ]
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
