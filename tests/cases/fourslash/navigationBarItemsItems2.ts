/// <reference path="fourslash.ts"/>

/////**/

goTo.marker();
edit.insertLine("module A");
edit.insert("export class ");

verify.navigationTree({
    "text": "\"navigationBarItemsItems2\"",
    "kind": "module",
    "childItems": [
        {
            "text": "<class>",
            "kind": "class",
            "kindModifiers": "export"
        },
        {
            "text": "A",
            "kind": "module"
        }
    ]
});

// should not crash
verify.navigationBar([
    {
        "text": "\"navigationBarItemsItems2\"",
        "kind": "module",
        "childItems": [
            {
                "text": "<class>",
                "kind": "class",
                "kindModifiers": "export"
            },
            {
                "text": "A",
                "kind": "module"
            }
        ]
    },
    {
        "text": "<class>",
        "kind": "class",
        "kindModifiers": "export",
        "indent": 1
    },
    {
        "text": "A",
        "kind": "module",
        "indent": 1
    }
]);
