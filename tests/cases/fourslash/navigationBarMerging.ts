/// <reference path="fourslash.ts"/>

// @Filename: file1.ts
////namespace a {
////    function foo() {}
////}
////namespace b {
////    function foo() {}
////}
////namespace a {
////    function bar() {}
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "a",
            "kind": "module",
            "childItems": [
                {
                    "text": "bar",
                    "kind": "function"
                },
                {
                    "text": "foo",
                    "kind": "function"
                }
            ]
        },
        {
            "text": "b",
            "kind": "module",
            "childItems": [
                {
                    "text": "foo",
                    "kind": "function"
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
                "text": "a",
                "kind": "module"
            },
            {
                "text": "b",
                "kind": "module"
            }
        ]
    },
    {
        "text": "a",
        "kind": "module",
        "childItems": [
            {
                "text": "bar",
                "kind": "function"
            },
            {
                "text": "foo",
                "kind": "function"
            }
        ],
        "indent": 1
    },
    {
        "text": "b",
        "kind": "module",
        "childItems": [
            {
                "text": "foo",
                "kind": "function"
            }
        ],
        "indent": 1
    }
]);

// Does not merge unlike declarations.
// @Filename: file2.ts
////namespace a {}
////function a() {}

goTo.file("file2.ts");

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "a",
            "kind": "function"
        },
        {
            "text": "a",
            "kind": "module"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "a",
                "kind": "function"
            },
            {
                "text": "a",
                "kind": "module"
            }
        ]
    },
    {
        "text": "a",
        "kind": "function",
        "indent": 1
    },
    {
        "text": "a",
        "kind": "module",
        "indent": 1
    }
]);

// Merges recursively
// @Filename: file3.ts
////namespace a {
////    interface A {
////        foo: number;
////    }
////}
////namespace a {
////    interface A {
////        bar: number;
////    }
////}

goTo.file("file3.ts");

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "a",
            "kind": "module",
            "childItems": [
                {
                    "text": "A",
                    "kind": "interface",
                    "childItems": [
                        {
                            "text": "bar",
                            "kind": "property"
                        },
                        {
                            "text": "foo",
                            "kind": "property"
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
                "text": "a",
                "kind": "module"
            }
        ]
    },
    {
        "text": "a",
        "kind": "module",
        "childItems": [
            {
                "text": "A",
                "kind": "interface"
            }
        ],
        "indent": 1
    },
    {
        "text": "A",
        "kind": "interface",
        "childItems": [
            {
                "text": "bar",
                "kind": "property"
            },
            {
                "text": "foo",
                "kind": "property"
            }
        ],
        "indent": 2
    }
]);

// Does not merge 'module A' with 'module A.B'

// @Filename: file4.ts
////namespace A { export var x; }
////namespace A.B { export var y; }

goTo.file("file4.ts");

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "A",
            "kind": "module",
            "childItems": [
                {
                    "text": "x",
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
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "A",
                "kind": "module"
            },
            {
                "text": "A.B",
                "kind": "module"
            }
        ]
    },
    {
        "text": "A",
        "kind": "module",
        "childItems": [
            {
                "text": "x",
                "kind": "var",
                "kindModifiers": "export"
            }
        ],
        "indent": 1
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
    }
]);
