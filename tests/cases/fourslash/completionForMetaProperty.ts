/// <reference path='fourslash.ts'/>

////import./*1*/;
////new./*2*/

verify.completions(
    {
        marker: "1",
        exact: [{ name: "meta", text: "(property) meta: ImportMeta" }]
    },
    {
        marker: "2",
        exact: [{ name: "target", text: "(property) target: NewableFunction" }]
    },
);