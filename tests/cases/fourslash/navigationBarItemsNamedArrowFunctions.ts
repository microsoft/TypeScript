/// <reference path="fourslash.ts" />

////export const value = 2;
////export const func = () => 2;
////export const func2 = function() { };
////export function exportedFunction() { }

verify.navigationBar([
    {
        "text": "\"navigationBarItemsNamedArrowFunctions\"",
        "kind": "module",
        "childItems": [
            {
                "text": "exportedFunction",
                "kind": "function",
                "kindModifiers": "export"
            },
            {
                "text": "func",
                "kind": "function"
            },
            {
                "text": "func2",
                "kind": "function"
            },
            {
                "text": "value",
                "kind": "const",
                "kindModifiers": "export"
            }
        ]
    },
    {
        "text": "exportedFunction",
        "kind": "function",
        "kindModifiers": "export",
        "indent": 1
    },
    {
        "text": "func",
        "kind": "function",
        "kindModifiers": "export",
        "indent": 1
    },
    {
        "text": "func2",
        "kind": "function",
        "kindModifiers": "export",
        "indent": 1
    }
]);

verify.navigationTree({
    "text": "\"navigationBarItemsNamedArrowFunctions\"",
    "kind": "module",
    "childItems": [
        {
            "text": "exportedFunction",
            "kind": "function",
            "kindModifiers": "export"
        },
        {
            "text": "func",
            "kind": "function",
            "kindModifiers": "export"
        },
        {
            "text": "func2",
            "kind": "function",
            "kindModifiers": "export"
        },
        {
            "text": "value",
            "kind": "const",
            "kindModifiers": "export"
        }
    ]
});
