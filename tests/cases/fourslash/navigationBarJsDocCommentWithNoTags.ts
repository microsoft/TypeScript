/// <reference path="fourslash.ts"/>

/////** Test */
////export const Test = {}

verify.navigationBar([
    {
        "text": "\"navigationBarJsDocCommentWithNoTags\"",
        "kind": "module",
        "childItems": [
            {
                "text": "Test",
                "kind": "const",
                "kindModifiers": "export"
            }
        ]
    }
]);
