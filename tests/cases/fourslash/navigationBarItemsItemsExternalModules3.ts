/// <reference path="fourslash.ts"/>

// @Filename: test/my fil	e.ts
////export class Bar {
////    public s: string;
////}
////export var x: number;

verify.navigationTree({
    "text": "\"my fil\\te\"",
    "kind": "module",
    "childItems": [
        {
            "text": "Bar",
            "kind": "class",
            "kindModifiers": "export",
            "childItems": [
                {
                    "text": "s",
                    "kind": "property",
                    "kindModifiers": "public"
                }
            ]
        },
        {
            "text": "x",
            "kind": "var",
            "kindModifiers": "export"
        }
    ]
});

verify.navigationBar([
    {
        "text": "\"my fil\\te\"",
        "kind": "module",
        "childItems": [
            {
                "text": "Bar",
                "kind": "class",
                "kindModifiers": "export"
            },
            {
                "text": "x",
                "kind": "var",
                "kindModifiers": "export"
            }
        ]
    },
    {
        "text": "Bar",
        "kind": "class",
        "kindModifiers": "export",
        "childItems": [
            {
                "text": "s",
                "kind": "property",
                "kindModifiers": "public"
            }
        ],
        "indent": 1
    }
]);
