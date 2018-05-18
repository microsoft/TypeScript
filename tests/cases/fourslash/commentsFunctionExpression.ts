/// <reference path='fourslash.ts' />

// test arrow doc comments
/////** lambdaFoo var comment*/
////var lamb/*1*/daFoo = /** this is lambda comment*/ (/**param a*/a: number, /**param b*/b: number) => /*2*/a + b;
////var lambddaN/*3*/oVarComment = /** this is lambda multiplication*/ (/**param a*/a: number, /**param b*/b: number) => a * b;
/////*4*/lambdaFoo(/*5*/10, /*6*/20);

// test nested arrow doc comments
////function /*7*/anotherFunc(a: number) {
////    /** documentation
////        @param b {string} inner parameter */
////    var /*8*/lambdaVar = /** inner docs */(/*9*/b: string) => {
////        var /*10*/localVar = "Hello ";
////        return /*11*/localVar + /*12*/b;
////    }
////    return lamb/*13*/daVar("World") + a;
////}

// test function expression doc comments
/////**
//// * On variable
//// * @param s the first parameter!
//// * @returns the parameter's length
//// */
////var assi/*14*/gned = /**
////                * Summary on expression
////                * @param s param on expression
////                * @returns return on expression
////                */function(/** On parameter */s: string) {
////  return /*15*/s.length;
////}
////assig/*16*/ned/*17*/(/*18*/"hey");

verify.quickInfoAt("1", "var lambdaFoo: (a: number, b: number) => number", "lambdaFoo var comment\nthis is lambda comment");

goTo.marker('2');
verify.completionListContains('a', '(parameter) a: number', 'param a');
verify.completionListContains('b', '(parameter) b: number', 'param b');

// pick up doccomments from the lambda itself
verify.quickInfoAt("3", "var lambddaNoVarComment: (a: number, b: number) => number", "this is lambda multiplication");

goTo.marker('4');
verify.completionListContains('lambdaFoo', 'var lambdaFoo: (a: number, b: number) => number', 'lambdaFoo var comment\nthis is lambda comment');
verify.completionListContains('lambddaNoVarComment', 'var lambddaNoVarComment: (a: number, b: number) => number', 'this is lambda multiplication');

verify.signatureHelp(
    {
        marker: "5",
        docComment: "lambdaFoo var comment\nthis is lambda comment",
        parameterDocComment: "param a",
    },
    {
        marker: "6",
        docComment: "lambdaFoo var comment\nthis is lambda comment",
        parameterDocComment: "param b",
    },
);

// no documentation from nested lambda
verify.quickInfos({
    7: "function anotherFunc(a: number): string",
    8: ["(local var) lambdaVar: (b: string) => string", "documentation\ninner docs "],
    9: ["(parameter) b: string", "inner parameter "],
    10: "(local var) localVar: string",
    11: "(local var) localVar: string",
    12: ["(parameter) b: string", "inner parameter "],
    13: ["(local var) lambdaVar: (b: string) => string", "documentation\ninner docs "],
    14: [
        "var assigned: (s: string) => number",
        "On variable\nSummary on expression"
    ]
});

goTo.marker('15');
verify.completionListContains('s', '(parameter) s: string', "the first parameter!\nparam on expression\nOn parameter ");
verify.quickInfoAt("16", "var assigned: (s: string) => number", "On variable\nSummary on expression");
goTo.marker('17');
verify.completionListContains("assigned", "var assigned: (s: string) => number", "On variable\nSummary on expression");
verify.signatureHelp({
    marker: "18",
    docComment: "On variable\nSummary on expression",
    parameterDocComment: "the first parameter!\nparam on expression\nOn parameter ",
    tags: [
        { name: "param", text: "s the first parameter!" },
        { name: "returns", text: "the parameter's length" },
        { name: "param", text: "s param on expression" },
        { name: "returns", text: "return on expression" },
    ],
});
