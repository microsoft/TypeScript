
////declare module "Multiline\r\nMadness" {
////}
////
////declare module "Multiline\
////Madness" {
////}
////declare module "MultilineMadness" {}
////
////declare module "Multiline\
////Madness2" {
////}
////
////interface Foo {
////    "a1\\\r\nb";
////    "a2\
////    \
////    b"(): Foo;
////}
////
////class Bar implements Foo {
////    'a1\\\r\nb': Foo;
////
////    'a2\
////    \
////    b'(): Foo {
////        return this;
////    }
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "\"MultilineMadness\"",
            "kind": "module",
            "kindModifiers": "declare"
        },
        {
            "text": "\"MultilineMadness2\"",
            "kind": "module",
            "kindModifiers": "declare"
        },
        {
            "text": "\"Multiline\\r\\nMadness\"",
            "kind": "module",
            "kindModifiers": "declare"
        },
        {
            "text": "Bar",
            "kind": "class",
            "childItems": [
                {
                    "text": "'a1\\\\\\r\\nb'",
                    "kind": "property"
                },
                {
                    "text": "'a2        b'",
                    "kind": "method"
                }
            ]
        },
        {
            "text": "Foo",
            "kind": "interface",
            "childItems": [
                {
                    "text": "\"a1\\\\\\r\\nb\"",
                    "kind": "property"
                },
                {
                    "text": "\"a2        b\"",
                    "kind": "method"
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
                "text": "\"MultilineMadness\"",
                "kind": "module",
                "kindModifiers": "declare"
            },
            {
                "text": "\"MultilineMadness2\"",
                "kind": "module",
                "kindModifiers": "declare"
            },
            {
                "text": "\"Multiline\\r\\nMadness\"",
                "kind": "module",
                "kindModifiers": "declare"
            },
            {
                "text": "Bar",
                "kind": "class"
            },
            {
                "text": "Foo",
                "kind": "interface"
            }
        ]
    },
    {
        "text": "\"MultilineMadness\"",
        "kind": "module",
        "kindModifiers": "declare",
        "indent": 1
    },
    {
        "text": "\"MultilineMadness2\"",
        "kind": "module",
        "kindModifiers": "declare",
        "indent": 1
    },
    {
        "text": "\"Multiline\\r\\nMadness\"",
        "kind": "module",
        "kindModifiers": "declare",
        "indent": 1
    },
    {
        "text": "Bar",
        "kind": "class",
        "childItems": [
            {
                "text": "'a1\\\\\\r\\nb'",
                "kind": "property"
            },
            {
                "text": "'a2        b'",
                "kind": "method"
            }
        ],
        "indent": 1
    },
    {
        "text": "Foo",
        "kind": "interface",
        "childItems": [
            {
                "text": "\"a1\\\\\\r\\nb\"",
                "kind": "property"
            },
            {
                "text": "\"a2        b\"",
                "kind": "method"
            }
        ],
        "indent": 1
    }
]);
