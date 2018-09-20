/// <reference path="fourslash.ts"/>


// @Filename: navigationItemsModuleVariables_0.ts
//// /*file1*/
////module Module1 {
////    export var x = 0;
////}

// @Filename: navigationItemsModuleVariables_1.ts
//// /*file2*/
////module Module1.SubModule {
////    export var y = 0;
////}

// @Filename: navigationItemsModuleVariables_2.ts
//// /*file3*/
////module Module1 {
////    export var z = 0;
////}
goTo.marker("file1");
// nothing else should show up
verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "Module1",
            "kind": "module",
            "childItems": [
                {
                    "text": "x",
                    "kind": "var",
                    "kindModifiers": "export"
                }
            ]
        }
    ]
});
verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "Module1",
                "kind": "module"
            }
        ]
    },
    {
        "text": "Module1",
        "kind": "module",
        "childItems": [
            {
                "text": "x",
                "kind": "var",
                "kindModifiers": "export"
            }
        ],
        "indent": 1
    }
]);

goTo.marker("file2");
verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "Module1.SubModule",
            "kind": "module",
            "childItems": [
                {
                    "text": "y",
                    "kind": "var",
                    "kindModifiers": "export"
                }
            ]
        }
    ]
});
verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "Module1.SubModule",
                "kind": "module"
            }
        ]
    },
    {
        "text": "Module1.SubModule",
        "kind": "module",
        "childItems": [
            {
                "text": "y",
                "kind": "var",
                "kindModifiers": "export"
            }
        ],
        "indent": 1
    }
]);
