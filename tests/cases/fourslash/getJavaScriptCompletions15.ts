/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: refFile1.ts
//// export var V = 1;

// @Filename: refFile2.ts
//// export var V = "123"

// @Filename: refFile3.ts
//// export var V = "123"

// @Filename: main.js
//// import ref1 = require("./refFile1");
//// var ref2 = require("./refFile2");
//// ref1.V./*1*/;
//// ref2.V./*2*/;
//// var v = { x: require("./refFile3") };
//// v.x./*3*/;
//// v.x.V./*4*/;

verify.completions(
    { marker: "1", includes: "toExponential" },
    { marker: "2", includes: "toLowerCase" },
    {
        marker: "3",
        exact: [
            "V",
            { name: "ref1", sortText: completion.SortText.JavascriptIdentifiers },
            { name: "ref2", sortText: completion.SortText.JavascriptIdentifiers },
            { name: "require", sortText: completion.SortText.JavascriptIdentifiers },
            { name: "v", sortText: completion.SortText.JavascriptIdentifiers },
            { name: "x", sortText: completion.SortText.JavascriptIdentifiers }
        ]
    },
    { marker: "4", includes: "toLowerCase" },
);
