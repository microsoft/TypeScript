/// <reference path="fourslash.ts" />

////let c = 0;

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "c",
                "kind": "let"
            }
        ]
    }
]);
