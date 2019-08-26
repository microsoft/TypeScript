
//// function f(p1: () => any, p2: string) { }
//// f(() => { }, `line1\
//// line2\
//// line3`);
////
//// class c1 {
////     const a = ' ''line1\
////         line2';
//// }

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "c1",
            "kind": "class",
            "childItems": [
                {
                    "text": "a",
                    "kind": "property"
                },
                {
                    "text": "'line1        line2'",
                    "kind": "property"
                }
            ]
        },
        {
            "text": "f",
            "kind": "function"
        },
        {
            "text": "f(`line1line2line3`) callback",
            "kind": "function"
        }
    ]
});

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "script",
        "childItems": [
            {
                "text": "c1",
                "kind": "class"
            },
            {
                "text": "f",
                "kind": "function"
            },
            {
                "text": "f(`line1line2line3`) callback",
                "kind": "function"
            }
        ]
    },
    {
        "text": "c1",
        "kind": "class",
        "childItems": [
            {
                "text": "a",
                "kind": "property"
            },
            {
                "text": "'line1        line2'",
                "kind": "property"
            }
        ],
        "indent": 1
    },
    {
        "text": "f",
        "kind": "function",
        "indent": 1
    },
    {
        "text": "f(`line1line2line3`) callback",
        "kind": "function",
        "indent": 1
    }
]);
