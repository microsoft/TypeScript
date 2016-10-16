/// <reference path="fourslash.ts" />

// @Filename: a.ts
////export default class { }

// @Filename: b.ts
////export default class C { }

// @Filename: c.ts
////export default function { }

// @Filename: d.ts
////export default function Func { }

goTo.file("a.ts");
verify.navigationTree({
    "text": "\"a\"",
    "kind": "module",
    "childItems": [
        {
            "text": "default",
            "kind": "class",
            "kindModifiers": "export"
        }
    ]
});
verify.navigationBar([
    {
        "text": "\"a\"",
        "kind": "module",
        "childItems": [
            {
                "text": "default",
                "kind": "class",
                "kindModifiers": "export"
            }
        ]
    },
    {
        "text": "default",
        "kind": "class",
        "kindModifiers": "export",
        "indent": 1
    }
]);

goTo.file("b.ts");
verify.navigationTree({
    "text": "\"b\"",
    "kind": "module",
    "childItems": [
        {
            "text": "C",
            "kind": "class",
            "kindModifiers": "export"
        }
    ]
});
verify.navigationBar([
    {
        "text": "\"b\"",
        "kind": "module",
        "childItems": [
            {
                "text": "C",
                "kind": "class",
                "kindModifiers": "export"
            }
        ]
    },
    {
        "text": "C",
        "kind": "class",
        "kindModifiers": "export",
        "indent": 1
    }
]);

goTo.file("c.ts");
verify.navigationTree({
    "text": "\"c\"",
    "kind": "module",
    "childItems": [
        {
            "text": "default",
            "kind": "function",
            "kindModifiers": "export"
        }
    ]
});
verify.navigationBar([
    {
        "text": "\"c\"",
        "kind": "module",
        "childItems": [
            {
                "text": "default",
                "kind": "function",
                "kindModifiers": "export"
            }
        ]
    },
    {
        "text": "default",
        "kind": "function",
        "kindModifiers": "export",
        "indent": 1
    }
]);

goTo.file("d.ts");
verify.navigationTree({
    "text": "\"d\"",
    "kind": "module",
    "childItems": [
        {
            "text": "Func",
            "kind": "function",
            "kindModifiers": "export"
        }
    ]
});
verify.navigationBar([
    {
        "text": "\"d\"",
        "kind": "module",
        "childItems": [
            {
                "text": "Func",
                "kind": "function",
                "kindModifiers": "export"
            }
        ]
    },
    {
        "text": "Func",
        "kind": "function",
        "kindModifiers": "export",
        "indent": 1
    }
]);
