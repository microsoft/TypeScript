/// <reference path='fourslash.ts'/>

// @Filename: file.ts
////export var x = 10;
////export var y = 10;
////export default class C {
////}


// @Filename: a.ts
////import { /*1*/ } from "./file";
////import { x, /*2*/ } from "./file";

goTo.file("a.ts");
verify.completions(
    {
        marker: "1",
        exact: [
            { name: "x", text: "var x: number" },
            { name: "y", text: "var y: number" },
            { name: "type", sortText: completion.SortText.GlobalsOrKeywords },
        ]
    },
    {
        marker: "2",
        exact: [
            { name: "y", text: "var y: number" },
            { name: "type", sortText: completion.SortText.GlobalsOrKeywords },
        ]
    },
);
