/// <reference path="fourslash.ts"/>


////export { a } from "a";
////
////export { b as B } from "a" 
////
////export import e = require("a");
////
////export * from "a"; // no bindings here

verify.navigationTree({
    "text": "\"navigationBarItemsExports\"",
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
            "text": "e",
            "kind": "alias",
            "kindModifiers": "export"
        }
    ]
});

verify.navigationBar([
    {
        "text": "\"navigationBarItemsExports\"",
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
                "text": "e",
                "kind": "alias",
                "kindModifiers": "export"
            }
        ]
    }
]);
