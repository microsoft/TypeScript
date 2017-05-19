/// <reference path="fourslash.ts"/>

// @Filename: test/file.ts
////export class Bar {
////    public s: string;
////}
////export var x: number;

verify.navigationTree({
    "text": "\"file\"",
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
        "text": "\"file\"",
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
