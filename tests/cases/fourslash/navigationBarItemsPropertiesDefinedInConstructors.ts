/// <reference path="fourslash.ts"/>

////class List<T> {
////    constructor(public a: boolean, private b: T, readonly c: string, d: number) {
////        var local = 0;
////    }
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "List",
                "kind": "class"
            }
        ]
    },
    {
        "text": "List",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            },
            {
                "text": "a",
                "kind": "property",
                "kindModifiers": "public"
            },
            {
                "text": "b",
                "kind": "property",
                "kindModifiers": "private"
            },
            {
                "text": "c",
                "kind": "property"
            }
        ],
        "indent": 1
    }
]);
