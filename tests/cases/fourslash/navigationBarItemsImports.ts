/// <reference path="fourslash.ts"/>


////import d1 from "a";
////
////import { a } from "a";
////
////import { b as B } from "a" 
////
////import d2, { c, d as D } from "a" 
////
////import e = require("a");
////
////import * as ns from "a";

verify.navigationTree({
    "text": "\"navigationBarItemsImports\"",
    "kind": "module",
    "childItems": [
        {
            "text": "a",
            "kind": "alias"
        },
        {
            "text": "B",
            "kind": "alias"
        },
        {
            "text": "c",
            "kind": "alias"
        },
        {
            "text": "D",
            "kind": "alias"
        },
        {
            "text": "d1",
            "kind": "alias"
        },
        {
            "text": "d2",
            "kind": "alias"
        },
        {
            "text": "e",
            "kind": "alias"
        },
        {
            "text": "ns",
            "kind": "alias"
        }
    ]
});

verify.navigationBar([
    {
        "text": "\"navigationBarItemsImports\"",
        "kind": "module",
        "childItems": [
            {
                "text": "a",
                "kind": "alias"
            },
            {
                "text": "B",
                "kind": "alias"
            },
            {
                "text": "c",
                "kind": "alias"
            },
            {
                "text": "D",
                "kind": "alias"
            },
            {
                "text": "d1",
                "kind": "alias"
            },
            {
                "text": "d2",
                "kind": "alias"
            },
            {
                "text": "e",
                "kind": "alias"
            },
            {
                "text": "ns",
                "kind": "alias"
            }
        ]
    }
]);
