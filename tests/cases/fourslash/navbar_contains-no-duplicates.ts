/// <reference path="fourslash.ts" />
//// declare module Windows {
////     export module Foundation {
////         export var A;
////         export class Test {
////             public wow();
////         }
////     }
//// }
////
//// declare module Windows {
////     export module Foundation {
////         export var B;
////         export module Test {
////             export function Boom(): number;
////         }
////     }
//// }
////
//// class ABC {
////     public foo() {
////         return 3;
////     }
//// }
////
//// module ABC {
////     export var x = 3;
//// }

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "ABC",
            "kind": "class",
            "childItems": [
                {
                    "text": "foo",
                    "kind": "method",
                    "kindModifiers": "public"
                }
            ]
        },
        {
            "text": "ABC",
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
            "text": "Windows",
            "kind": "module",
            "kindModifiers": "declare",
            "childItems": [
                {
                    "text": "Foundation",
                    "kind": "module",
                    "kindModifiers": "export,declare",
                    "childItems": [
                        {
                            "text": "A",
                            "kind": "var",
                            "kindModifiers": "export,declare"
                        },
                        {
                            "text": "B",
                            "kind": "var",
                            "kindModifiers": "export,declare"
                        },
                        {
                            "text": "Test",
                            "kind": "class",
                            "kindModifiers": "export,declare",
                            "childItems": [
                                {
                                    "text": "wow",
                                    "kind": "method",
                                    "kindModifiers": "public,declare"
                                }
                            ]
                        },
                        {
                            "text": "Test",
                            "kind": "module",
                            "kindModifiers": "export,declare",
                            "childItems": [
                                {
                                    "text": "Boom",
                                    "kind": "function",
                                    "kindModifiers": "export,declare"
                                }
                            ]
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
                "text": "ABC",
                "kind": "class"
            },
            {
                "text": "ABC",
                "kind": "module"
            },
            {
                "text": "Windows",
                "kind": "module",
                "kindModifiers": "declare"
            }
        ]
    },
    {
        "text": "ABC",
        "kind": "class",
        "childItems": [
            {
                "text": "foo",
                "kind": "method",
                "kindModifiers": "public"
            }
        ],
        "indent": 1
    },
    {
        "text": "ABC",
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
        "text": "Windows",
        "kind": "module",
        "kindModifiers": "declare",
        "childItems": [
            {
                "text": "Foundation",
                "kind": "module",
                "kindModifiers": "export,declare"
            }
        ],
        "indent": 1
    },
    {
        "text": "Foundation",
        "kind": "module",
        "kindModifiers": "export,declare",
        "childItems": [
            {
                "text": "A",
                "kind": "var",
                "kindModifiers": "export,declare"
            },
            {
                "text": "B",
                "kind": "var",
                "kindModifiers": "export,declare"
            },
            {
                "text": "Test",
                "kind": "class",
                "kindModifiers": "export,declare"
            },
            {
                "text": "Test",
                "kind": "module",
                "kindModifiers": "export,declare"
            }
        ],
        "indent": 2
    },
    {
        "text": "Test",
        "kind": "class",
        "kindModifiers": "export,declare",
        "childItems": [
            {
                "text": "wow",
                "kind": "method",
                "kindModifiers": "public,declare"
            }
        ],
        "indent": 3
    },
    {
        "text": "Test",
        "kind": "module",
        "kindModifiers": "export,declare",
        "childItems": [
            {
                "text": "Boom",
                "kind": "function",
                "kindModifiers": "export,declare"
            }
        ],
        "indent": 3
    }
]);
