/// <reference path="fourslash.ts" />

//// {| "itemName": "c", "kind": "const", "parentName": "" |}const c = 0;

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
