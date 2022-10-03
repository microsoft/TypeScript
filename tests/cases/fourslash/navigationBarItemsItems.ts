/// <reference path="fourslash.ts"/>

////// Interface
////interface IPoint {
////    getDist(): number;
////    new(): IPoint;
////    (): any;
////    [x:string]: number;
////    prop: string;
////}
////
/////// Module
////module Shapes {
////
////    // Class
////    export class Point implements IPoint {
////        constructor (public x: number, public y: number) { }
////
////        // Instance member
////        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
////
////        // Getter
////        get value(): number { return 0; }
////
////        // Setter
////        set value(newValue: number) { return; }
////
////        // Static member
////        static origin = new Point(0, 0);
////
////        // Static method
////        private static getOrigin() { return Point.origin; }
////    }
////
////    enum Values { value1, value2, value3 }
////}
////
////// Local variables
////var p: IPoint = new Shapes.Point(3, 4);
////var dist = p.getDist();

verify.navigationTree({
    "text": "<global>",
    "kind": "script",
    "childItems": [
        {
            "text": "dist",
            "kind": "var"
        },
        {
            "text": "IPoint",
            "kind": "interface",
            "childItems": [
                {
                    "text": "()",
                    "kind": "call"
                },
                {
                    "text": "new()",
                    "kind": "construct"
                },
                {
                    "text": "[]",
                    "kind": "index"
                },
                {
                    "text": "getDist",
                    "kind": "method"
                },
                {
                    "text": "prop",
                    "kind": "property"
                }
            ]
        },
        {
            "text": "p",
            "kind": "var"
        },
        {
            "text": "Shapes",
            "kind": "module",
            "childItems": [
                {
                    "text": "Point",
                    "kind": "class",
                    "kindModifiers": "export",
                    "childItems": [
                        {
                            "text": "constructor",
                            "kind": "constructor"
                        },
                        {
                            "text": "getDist",
                            "kind": "method"
                        },
                        {
                            "text": "getOrigin",
                            "kind": "method",
                            "kindModifiers": "private,static"
                        },
                        {
                            "text": "origin",
                            "kind": "property",
                            "kindModifiers": "static"
                        },
                        {
                            "text": "value",
                            "kind": "getter"
                        },
                        {
                            "text": "value",
                            "kind": "setter"
                        },
                        {
                            "text": "x",
                            "kind": "property",
                            "kindModifiers": "public"
                        },
                        {
                            "text": "y",
                            "kind": "property",
                            "kindModifiers": "public"
                        }
                    ]
                },
                {
                    "text": "Values",
                    "kind": "enum",
                    "childItems": [
                        {
                            "text": "value1",
                            "kind": "enum member"
                        },
                        {
                            "text": "value2",
                            "kind": "enum member"
                        },
                        {
                            "text": "value3",
                            "kind": "enum member"
                        }
                    ]
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
                "text": "dist",
                "kind": "var"
            },
            {
                "text": "IPoint",
                "kind": "interface"
            },
            {
                "text": "p",
                "kind": "var"
            },
            {
                "text": "Shapes",
                "kind": "module"
            }
        ]
    },
    {
        "text": "IPoint",
        "kind": "interface",
        "childItems": [
            {
                "text": "()",
                "kind": "call"
            },
            {
                "text": "new()",
                "kind": "construct"
            },
            {
                "text": "[]",
                "kind": "index"
            },
            {
                "text": "getDist",
                "kind": "method"
            },
            {
                "text": "prop",
                "kind": "property"
            }
        ],
        "indent": 1
    },
    {
        "text": "Shapes",
        "kind": "module",
        "childItems": [
            {
                "text": "Point",
                "kind": "class",
                "kindModifiers": "export"
            },
            {
                "text": "Values",
                "kind": "enum"
            }
        ],
        "indent": 1
    },
    {
        "text": "Point",
        "kind": "class",
        "kindModifiers": "export",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            },
            {
                "text": "getDist",
                "kind": "method"
            },
            {
                "text": "getOrigin",
                "kind": "method",
                "kindModifiers": "private,static"
            },
            {
                "text": "origin",
                "kind": "property",
                "kindModifiers": "static"
            },
            {
                "text": "value",
                "kind": "getter"
            },
            {
                "text": "value",
                "kind": "setter"
            },
            {
                "text": "x",
                "kind": "property",
                "kindModifiers": "public"
            },
            {
                "text": "y",
                "kind": "property",
                "kindModifiers": "public"
            }
        ],
        "indent": 2
    },
    {
        "text": "Values",
        "kind": "enum",
        "childItems": [
            {
                "text": "value1",
                "kind": "enum member"
            },
            {
                "text": "value2",
                "kind": "enum member"
            },
            {
                "text": "value3",
                "kind": "enum member"
            }
        ],
        "indent": 2
    }
]);
