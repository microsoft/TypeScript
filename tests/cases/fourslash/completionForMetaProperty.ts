/// <reference path='fourslash.ts'/>

////import./*1*/;
////new./*2*/;
////function test() { new./*3*/ }

verify.completions(
    {
        marker: "1",
        exact: [{ name: "meta", text: "(property) ImportMetaExpression.meta: ImportMeta" }]
    },
    {
        marker: "2",
        exact: []
    },
    {
        marker: "3",
        exact: [{ name: "target", text: "(property) NewTargetExpression.target: () => void" }]
    },
);