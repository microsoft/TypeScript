/// <reference path='fourslash.ts'/> 
////'use strict'
////var foo, {}
////var bar, []
////let foo1, {a, b}
////const bar1, [c, d]
////var {e, x: [f, g]} = {a:1, x:[]};

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "a",
            "kind": "let"
        },
        {
            "text": "b",
            "kind": "let"
        },
        {
            "text": "bar",
            "kind": "var"
        },
        {
            "text": "bar1",
            "kind": "const"
        },
        {
            "text": "c",
            "kind": "const"
        },
        {
            "text": "d",
            "kind": "const"
        },
        {
            "text": "e",
            "kind": "var"
        },
        {
            "text": "f",
            "kind": "var"
        },
        {
            "text": "foo",
            "kind": "var"
        },
        {
            "text": "foo1",
            "kind": "let"
        },
        {
            "text": "g",
            "kind": "var"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "a",
                "kind": "let"
            },
            {
                "text": "b",
                "kind": "let"
            },
            {
                "text": "bar",
                "kind": "var"
            },
            {
                "text": "bar1",
                "kind": "const"
            },
            {
                "text": "c",
                "kind": "const"
            },
            {
                "text": "d",
                "kind": "const"
            },
            {
                "text": "e",
                "kind": "var"
            },
            {
                "text": "f",
                "kind": "var"
            },
            {
                "text": "foo",
                "kind": "var"
            },
            {
                "text": "foo1",
                "kind": "let"
            },
            {
                "text": "g",
                "kind": "var"
            }
        ]
    }
]);
