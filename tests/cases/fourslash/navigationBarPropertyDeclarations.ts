/// <reference path="fourslash.ts"/>

////class A {
////    public A1 = class {
////        public x = 1;
////        private y() {}
////        protected z() {}
////    }
////
////    public A2 = {
////        x: 1,
////        y() {},
////        z() {}
////    }
////
////    public A3 = function () {}
////    public A4 = () => {}
////    public A5 = 1;
////    public A6 = "A6";
////
////    public ["A7"] = class {
////        public x = 1;
////        private y() {}
////        protected z() {}
////    }
////
////    public [1] = {
////        x: 1,
////        y() {},
////        z() {}
////    }
////
////    public [1 + 1] = 1;
////}

verify.navigationTree({
    text: "<global>",
    kind: "script",
    childItems: [
        {
            text: "A",
            kind: "class",
            childItems: [
                {
                    text: "[1]",
                    kind: "property",
                    kindModifiers: "public",
                    childItems: [
                        {
                            text: "x",
                            kind: "property"
                        },
                        {
                            text: "y",
                            kind: "method"
                        },
                        {
                            text: "z",
                            kind: "method"
                        }
                    ]
                },
                {
                    text: "A1",
                    kind: "property",
                    kindModifiers: "public",
                    childItems: [
                        {
                            text: "x",
                            kind: "property",
                            kindModifiers: "public"
                        },
                        {
                            text: "y",
                            kind: "method",
                            kindModifiers: "private"
                        },
                        {
                            text: "z",
                            kind: "method",
                            kindModifiers: "protected"
                        }
                    ]
                },
                {
                    text: "A2",
                    kind: "property",
                    kindModifiers: "public",
                    childItems: [
                        {
                            text: "x",
                            kind: "property"
                        },
                        {
                            text: "y",
                            kind: "method"
                        },
                        {
                            text: "z",
                            kind: "method"
                        }
                    ]
                },
                {
                    text: "A3",
                    kind: "property",
                    kindModifiers: "public"
                },
                {
                    text: "A4",
                    kind: "property",
                    kindModifiers: "public"
                },
                {
                    text: "A5",
                    kind: "property",
                    kindModifiers: "public"
                },
                {
                    text: "A6",
                    kind: "property",
                    kindModifiers: "public"
                },
                {
                    text: "[\"A7\"]",
                    kind: "property",
                    kindModifiers: "public",
                    childItems: [
                        {
                            text: "x",
                            kind: "property",
                            kindModifiers: "public"
                        },
                        {
                            text: "y",
                            kind: "method",
                            kindModifiers: "private"
                        },
                        {
                            text: "z",
                            kind: "method",
                            kindModifiers: "protected"
                        }
                    ]
                }
            ]
        }
    ]
});

verify.navigationBar([
    {
        text: "<global>",
        kind: "script",
        childItems: [
            {
                text: "A",
                kind: "class"
            }
        ]
    },
    {
        text: "A",
        kind: "class",
        childItems: [
            {
                text: "[1]",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "A1",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "A2",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "A3",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "A4",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "A5",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "A6",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "[\"A7\"]",
                kind: "property",
                kindModifiers: "public"
            }
        ],
        indent: 1
    },
    {
        text: "[1]",
        kind: "property",
        kindModifiers: "public",
        childItems: [
            {
                text: "x",
                kind: "property"
            },
            {
                text: "y",
                kind: "method"
            },
            {
                text: "z",
                kind: "method"
            }
        ],
        indent: 2
    },
    {
        text: "A1",
        kind: "property",
        kindModifiers: "public",
        childItems: [
            {
                text: "x",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "y",
                kind: "method",
                kindModifiers: "private"
            },
            {
                text: "z",
                kind: "method",
                kindModifiers: "protected"
            }
        ],
        indent: 2
    },
    {
        text: "A2",
        kind: "property",
        kindModifiers: "public",
        childItems: [
            {
                text: "x",
                kind: "property"
            },
            {
                text: "y",
                kind: "method"
            },
            {
                text: "z",
                kind: "method"
            }
        ],
        indent: 2
    },
    {
        text: "[\"A7\"]",
        kind: "property",
        kindModifiers: "public",
        childItems: [
            {
                text: "x",
                kind: "property",
                kindModifiers: "public"
            },
            {
                text: "y",
                kind: "method",
                kindModifiers: "private"
            },
            {
                text: "z",
                kind: "method",
                kindModifiers: "protected"
            }
        ],
        indent: 2
    }
]);
