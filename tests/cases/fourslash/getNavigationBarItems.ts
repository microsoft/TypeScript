/// <reference path="fourslash.ts" />

////class C {
////    foo;
////    ["bar"]: string;
////}

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
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
]);
