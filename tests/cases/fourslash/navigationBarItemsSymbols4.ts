/// <reference path="fourslash.ts"/>

// @checkJs: true
// @allowJs: true
// @target: es6
// @Filename: file.js
////const _sym = Symbol("_sym");
////class MyClass {
////    constructor() {
////        // Dynamic assignment properties can't show up in navigation,
////        // as they're not syntactic members
////        // Additonally, late bound members are always filtered out, besides
////        this[_sym] = "ok";
////    }
////
////    method() {
////        this[_sym] = "yep";
////        const x = this[_sym];
////    }
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "_sym",
            "kind": "const"
        },
        {
            "text": "MyClass",
            "kind": "class",
            "childItems": [
                {
                    "text": "constructor",
                    "kind": "constructor"
                },
                {
                    "text": "method",
                    "kind": "method",
                    "childItems": [
                        {
                            "text": "x",
                            "kind": "const"
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
                "text": "_sym",
                "kind": "const"
            },
            {
                "text": "MyClass",
                "kind": "class"
            }
        ]
    },
    {
        "text": "MyClass",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            },
            {
                "text": "method",
                "kind": "method",
            }
        ],
        "indent": 1
    },
    {
        "text": "method",
        "kind": "method",
        "childItems": [
            {
                "text": "x",
                "kind": "const"
            }
        ],
        "indent": 2
    }
]);
