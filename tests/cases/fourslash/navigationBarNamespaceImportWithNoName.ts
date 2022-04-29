/// <reference path="fourslash.ts"/>

////import *{} from 'foo';

verify.navigationTree({
    "text": "\"navigationBarNamespaceImportWithNoName\"",
    "kind": "module",
    "childItems": [
        {
            "text": "<unknown>",
            "kind": "alias"
        }
    ]
});

verify.navigationBar([
    {
        "text": "\"navigationBarNamespaceImportWithNoName\"",
        "kind": "module",
        "childItems": [
            {
                "text": "<unknown>",
                "kind": "alias"
            }
        ]
    }
]);
