/// <reference path="fourslash.ts"/>

////class Class {
////    constructor() {
////        function LocalFunctionInConstructor() {}
////        interface LocalInterfaceInConstrcutor {}
////        enum LocalEnumInConstructor { LocalEnumMemberInConstructor }
////    }
////
////    method() {
////        function LocalFunctionInMethod() {
////            function LocalFunctionInLocalFunctionInMethod() {}
////        }
////        interface LocalInterfaceInMethod {}
////        enum LocalEnumInMethod { LocalEnumMemberInMethod }
////    }
////
////    emptyMethod() { } // Non child functions method should not be duplicated
////}

verify.navigationBar([
    {
        "text": "<global>",
        "kind": "module",
        "childItems": [
            {
                "text": "Class",
                "kind": "class"
            }
        ]
    },
    {
        "text": "Class",
        "kind": "class",
        "childItems": [
            {
                "text": "constructor",
                "kind": "constructor"
            },
            {
                "text": "emptyMethod",
                "kind": "method"
            },
            {
                "text": "method",
                "kind": "method"
            }
        ],
        "indent": 1
    },
    {
        "text": "constructor",
        "kind": "constructor",
        "childItems": [
            {
                "text": "LocalEnumInConstructor",
                "kind": "enum"
            },
            {
                "text": "LocalFunctionInConstructor",
                "kind": "function"
            },
            {
                "text": "LocalInterfaceInConstrcutor",
                "kind": "interface"
            }
        ],
        "indent": 2
    },
    {
        "text": "LocalEnumInConstructor",
        "kind": "enum",
        "childItems": [
            {
                "text": "LocalEnumMemberInConstructor",
                "kind": "property"
            }
        ],
        "indent": 2
    },
    {
        "text": "LocalFunctionInConstructor",
        "kind": "function",
        "indent": 2
    },
    {
        "text": "LocalInterfaceInConstrcutor",
        "kind": "interface",
        "indent": 2
    },
    {
        "text": "method",
        "kind": "method",
        "childItems": [
            {
                "text": "LocalEnumInMethod",
                "kind": "enum"
            },
            {
                "text": "LocalFunctionInMethod",
                "kind": "function"
            },
            {
                "text": "LocalInterfaceInMethod",
                "kind": "interface"
            }
        ],
        "indent": 2
    },
    {
        "text": "LocalEnumInMethod",
        "kind": "enum",
        "childItems": [
            {
                "text": "LocalEnumMemberInMethod",
                "kind": "property"
            }
        ],
        "indent": 2
    },
    {
        "text": "LocalFunctionInMethod",
        "kind": "function",
        "childItems": [
            {
                "text": "LocalFunctionInLocalFunctionInMethod",
                "kind": "function"
            }
        ],
        "indent": 2
    },
    {
        "text": "LocalInterfaceInMethod",
        "kind": "interface",
        "indent": 2
    }
]);
