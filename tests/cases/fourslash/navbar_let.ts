/// <reference path="fourslash.ts" />

////let c = 0;

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "c",
            "kind": "let"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "c",
                "kind": "let"
            }
        ]
    }
]);
