/// <reference path="fourslash.ts" />

////const enum E {
////	A = 'A',
////}
////const a = '';
////
////class C {
////    [a]() {
////        return 1;
////    }
////
////    [E.A]() {
////        return 1;
////    }
////
////    [1]() {
////        return 1;
////    },
////
////    ["foo"]() {
////        return 1;
////    },
////}

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "a",
            kind: "const"
        },
        {
            text: "C",
            kind: "class",
            childItems: [
                {
                    text: "[a]",
                    kind: "method"
                },
                {
                    text: "[E.A]",
                    kind: "method"
                },
                {
                    text: "[1]",
                    kind: "method"
                },
                {
                    text: "[\"foo\"]",
                    kind: "method"
                }
            ],
        },
        {
            text: "E",
            kind: "enum",
            childItems: [
                {
                    text: "A",
                    kind: "enum member"
                },
            ]
        }
    ]
});
