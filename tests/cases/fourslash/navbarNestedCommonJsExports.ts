/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
////exports.a = exports.b = exports.c = 0;

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "a",
            kind: "const",
            childItems: [
                {
                    text: "b",
                    kind: "const",
                    childItems: [{ text: "c", kind: "const" }],
                },
            ],
        },
    ],
});

verify.navigationBar([
    {
        text: "<global>",
        kind: "script",
        childItems: [
            { text: "a", kind: "const" },
        ],
    },
]);

