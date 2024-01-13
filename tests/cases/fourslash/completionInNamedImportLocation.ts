/// <reference path='fourslash.ts'/>

// @Filename: file.ts
////export var x = 10;
////export var y = 10;
////export { x as await, x as interface, x as unique };
////export default class C {
////}


// @Filename: a.ts
////import { /*1*/ } from "./file";
////import { x, /*2*/ } from "./file";
////import { x, y, /*3*/ } from "./file";
////import { x, y, await as await_, /*4*/ } from "./file";
////import { x, y, await as await_, interface as interface_, /*5*/ } from "./file";
////import { x, y, await as await_, interface as interface_, unique, /*6*/ } from "./file";

goTo.file("a.ts");
verify.completions(
    {
        marker: "1",
        exact: [
            { name: "await", insertText: "await as await_" },
            { name: "interface", insertText: "interface as interface_" },
            { name: "unique" },
            { name: "x", text: "var x: number" },
            { name: "y", text: "var y: number" },
            { name: "type", sortText: completion.SortText.GlobalsOrKeywords },
        ]
    },
    {
        marker: "2",
        exact: [
            { name: "await", insertText: "await as await_" },
            { name: "interface", insertText: "interface as interface_" },
            { name: "unique" },
            { name: "y", text: "var y: number" },
            { name: "type", sortText: completion.SortText.GlobalsOrKeywords },
        ]
    },
    {
        marker: "3",
        exact: [
            { name: "await", insertText: "await as await_" },
            { name: "interface", insertText: "interface as interface_" },
            { name: "unique" },
            { name: "type", sortText: completion.SortText.GlobalsOrKeywords },
        ]
    },
    {
        marker: "4",
        exact: [
            { name: "interface", insertText: "interface as interface_" },
            { name: "unique" },
            { name: "type", sortText: completion.SortText.GlobalsOrKeywords },
        ]
    },
    {
        marker: "5",
        exact: [
            { name: "unique" },
            { name: "type", sortText: completion.SortText.GlobalsOrKeywords },
        ]
    },
    {
        marker: "6",
        exact: []
    },
);
