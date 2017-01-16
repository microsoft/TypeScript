/// <reference path="fourslash.ts"/>

////declare module "X.Y.Z" {}
////
////declare module 'X2.Y2.Z2' {}
////
////module A.B.C {
////    export var x;
////}
////
////module A.B {
////    export var y;
////}
////
////module A {
////    export var z;
////}
////
////module A {
////    module B {
////        module C {
////            declare var x;
////        }
////    }
////}

//We have 8 module keywords, and 4 var keywords.
//The declarations of A.B.C.x do not get merged, so the 4 vars are independent.
//The two 'A' modules, however, do get merged, so in reality we have 7 modules.
verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "'X2.Y2.Z2'",
            "kind": "module",
            "kindModifiers": "declare"
        },
        {
            "text": "\"X.Y.Z\"",
            "kind": "module",
            "kindModifiers": "declare"
        },
        {
            "text": "A",
            "kind": "module",
            "childItems": [
                {
                    "text": "B",
                    "kind": "module",
                    "childItems": [
                        {
                            "text": "C",
                            "kind": "module",
                            "childItems": [
                                {
                                    "text": "x",
                                    "kind": "var",
                                    "kindModifiers": "declare"
                                }
                            ]
                        }
                    ]
                },
                {
                    "text": "z",
                    "kind": "var",
                    "kindModifiers": "export"
                }
            ]
        },
        {
            "text": "A.B",
            "kind": "module",
            "childItems": [
                {
                    "text": "y",
                    "kind": "var",
                    "kindModifiers": "export"
                }
            ]
        },
        {
            "text": "A.B.C",
            "kind": "module",
            "childItems": [
                {
                    "text": "x",
                    "kind": "var",
                    "kindModifiers": "export"
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
                "text": "'X2.Y2.Z2'",
                "kind": "module",
                "kindModifiers": "declare"
            },
            {
                "text": "\"X.Y.Z\"",
                "kind": "module",
                "kindModifiers": "declare"
            },
            {
                "text": "A",
                "kind": "module"
            },
            {
                "text": "A.B",
                "kind": "module"
            },
            {
                "text": "A.B.C",
                "kind": "module"
            }
        ]
    },
    {
        "text": "'X2.Y2.Z2'",
        "kind": "module",
        "kindModifiers": "declare",
        "indent": 1
    },
    {
        "text": "\"X.Y.Z\"",
        "kind": "module",
        "kindModifiers": "declare",
        "indent": 1
    },
    {
        "text": "A",
        "kind": "module",
        "childItems": [
            {
                "text": "B",
                "kind": "module"
            },
            {
                "text": "z",
                "kind": "var",
                "kindModifiers": "export"
            }
        ],
        "indent": 1
    },
    {
        "text": "B",
        "kind": "module",
        "childItems": [
            {
                "text": "C",
                "kind": "module"
            }
        ],
        "indent": 2
    },
    {
        "text": "C",
        "kind": "module",
        "childItems": [
            {
                "text": "x",
                "kind": "var",
                "kindModifiers": "declare"
            }
        ],
        "indent": 3
    },
    {
        "text": "A.B",
        "kind": "module",
        "childItems": [
            {
                "text": "y",
                "kind": "var",
                "kindModifiers": "export"
            }
        ],
        "indent": 1
    },
    {
        "text": "A.B.C",
        "kind": "module",
        "childItems": [
            {
                "text": "x",
                "kind": "var",
                "kindModifiers": "export"
            }
        ],
        "indent": 1
    }
]);
