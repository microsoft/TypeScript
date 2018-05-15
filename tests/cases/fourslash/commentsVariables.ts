/// <reference path='fourslash.ts' />

/////** This is my variable*/
////var myV/*1*/ariable = 10;
/////*2*/
/////** d variable*/
////var d = 10;
////myVariable = d;
/////*3*/
/////** foos comment*/
////function foo() {
////}
/////** fooVar comment*/
////var foo/*12*/Var: () => void;
/////*4*/
////f/*5q*/oo(/*5*/);
////fo/*6q*/oVar(/*6*/);
////fo/*13*/oVar = f/*14*/oo;
/////*7*/
////f/*8q*/oo(/*8*/);
////foo/*9q*/Var(/*9*/);
////var fooVarVar = /*9aq*/fooVar;
/////**class comment*/
////class c {
////    /** constructor comment*/
////    constructor() {
////    }
////}
/////**instance comment*/
////var i = new c();
/////*10*/
/////** interface comments*/
////interface i1 {
////}
/////**interface instance comments*/
////var i1_i: i1;
/////*11*/
////function foo2(a: number): void;
////function foo2(b: string): void;
////function foo2(aOrb) {
////}
////var x = fo/*15*/o2;

verify.quickInfoAt("1", "var myVariable: number", "This is my variable");

verify.completions(
    {
        marker: "2",
        includes: { name: "myVariable", text: "var myVariable: number", documentation: "This is my variable" },
    },
    {
        marker: "3",
        includes: [
            { name: "myVariable", text: "var myVariable: number", documentation: "This is my variable" },
            { name: "d", text: "var d: number", documentation: "d variable" }
        ],
    },
    {
        marker: "4",
        includes: [
            { name: "foo", text: "function foo(): void", documentation: "foos comment" },
            { name: "fooVar", text: "var fooVar: () => void", documentation:"fooVar comment" },
        ]
    },
)

verify.signatureHelp({ marker: "5", docComment: "foos comment" });
verify.quickInfoAt("5q", "function foo(): void", "foos comment");

verify.signatureHelp({ marker: "6", docComment: "fooVar comment" });
verify.quickInfoAt("6q", "var fooVar: () => void", "fooVar comment");

verify.completions({
    marker: "7",
    includes: [
        { name: "foo", text: "function foo(): void", documentation: "foos comment" },
        { name: "fooVar", text: "var fooVar: () => void", documentation:"fooVar comment" },
    ],
});

verify.signatureHelp({ marker: "8", docComment: "foos comment" });
verify.quickInfoAt("8q", "function foo(): void", "foos comment");

verify.signatureHelp({ marker: "9", docComment: "fooVar comment" });
verify.quickInfos({
    "9q": ["var fooVar: () => void", "fooVar comment"],
    "9aq": ["var fooVar: () => void", "fooVar comment"]
});

verify.completions({ marker: "10", includes: { name: "i", text: "var i: c", documentation: "instance comment" } });
verify.completions({ marker: "11", includes: { name: "i1_i", text: "var i1_i: i1", documentation: "interface instance comments" } });

verify.quickInfos({
    12: ["var fooVar: () => void", "fooVar comment"],
    13: ["var fooVar: () => void", "fooVar comment"],
    14: ["function foo(): void", "foos comment"],
    15: "function foo2(a: number): void (+1 overload)"
});
