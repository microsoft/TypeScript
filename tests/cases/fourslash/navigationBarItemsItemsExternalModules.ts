/// <reference path="fourslash.ts"/>

////export class Bar {
////    public s: string;
////}

verify.navigationBar([
    {
        "text": "\"navigationBarItemsItemsExternalModules\"",
        "kind": "module",
        "childItems": [
            {
                "text": "Bar",
                "kind": "class",
                "kindModifiers": "export"
            }
        ],
        "indent": 0
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
