/// <reference path="fourslash.ts"/>

/////**/

goTo.marker();
edit.insertLine("module A");
edit.insert("export class ");

// should not crash
verify.navigationBar([
    {
        "text": "\"navigationBarItemsItems2\"",
        "kind": "module",
        "childItems": [
            {
                "text": "A",
                "kind": "module"
            }
        ],
        "indent": 0
    },
    {
        "text": "default",
        "kind": "class",
        "kindModifiers": "export",
        "childItems": [],
        "indent": 1
    },
    {
        "text": "A",
        "kind": "module",
        "childItems": [],
        "indent": 1
    }
]);
