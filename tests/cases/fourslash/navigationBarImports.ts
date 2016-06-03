/// <reference path="fourslash.ts"/>

////import a, {b} from "m";
////import c = require("m");
////import * as d from "m";

verify.navigationBar([
    {
        "text": "\"navigationBarImportEquals\"",
        "kind": "module",
        "childItems": [
            {
                "text": "a",
                "kind": "alias"
            },
            {
                "text": "b",
                "kind": "alias"
            },
            {
                "text": "c",
                "kind": "alias"
            },
            {
                "text": "d",
                "kind": "alias"
            }
        ]
    }
]);
