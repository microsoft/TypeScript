/// <reference path="fourslash.ts" />

////class C {
////    foo;
////    ["bar"]: string;
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "C",
                "kind": "class"
            }
        ]
    },
    {
        "text": "C",
        "kind": "class",
        "childItems": [
            {
                "text": "[\"bar\"]",
                "kind": "property"
            },
            {
                "text": "foo",
                "kind": "property"
            }
        ],
        "indent": 1
    }
])
