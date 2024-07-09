/// <reference path="fourslash.ts" />

//// const c = 0;

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "c",
            "kind": "const"
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
                "kind": "const"
            }
        ]
    }
]);
