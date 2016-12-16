/// <reference path="fourslash.ts" />

////console.log(console.log(class Y {}, class X {}), console.log(class B {}, class A {}));
////console.log(class Cls { meth() {} });

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "A",
            "kind": "class"
        },
        {
            "text": "B",
            "kind": "class"
        },
        {
            "text": "Cls",
            "kind": "class",
            "childItems": [
                {
                    "text": "meth",
                    "kind": "method"
                }
            ]
        },
        {
            "text": "X",
            "kind": "class"
        },
        {
            "text": "Y",
            "kind": "class"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "A",
                "kind": "class"
            },
            {
                "text": "B",
                "kind": "class"
            },
            {
                "text": "Cls",
                "kind": "class"
            },
            {
                "text": "X",
                "kind": "class"
            },
            {
                "text": "Y",
                "kind": "class"
            }
        ]
    },
    {
        "text": "A",
        "kind": "class",
        "indent": 1
    },
    {
        "text": "B",
        "kind": "class",
        "indent": 1
    },
    {
        "text": "Cls",
        "kind": "class",
        "childItems": [
            {
                "text": "meth",
                "kind": "method"
            }
        ],
        "indent": 1
    },
    {
        "text": "X",
        "kind": "class",
        "indent": 1
    },
    {
        "text": "Y",
        "kind": "class",
        "indent": 1
    }
]);
