/// <reference path='fourslash.ts'/>

////class A {
////    x: any
////    constructor([a]: any) {
////    }
////}
////class B {
////    x: any;
////    constructor( {a} = { a: 1 }) {
////    }
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "A",
                "kind": "class"
            },
            {
                "text": "B",
                "kind": "class"
            }
        ]
    },
    {
        "text": "A",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            },
            {
                "text": "x",
                "kind": "property"
            }
        ],
        "indent": 1
    },
    {
        "text": "B",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            },
            {
                "text": "x",
                "kind": "property"
            }
        ],
        "indent": 1
    }
]);
