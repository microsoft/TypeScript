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

verify.quickInfoAt("1", "var lambdaFoo: (a: number, b: number) => number", "this is lambda comment\nlambdaFoo var comment");

verify.completions({
    marker: "2",
    includes: [
        { name: "a", text: "(parameter) a: number", documentation: "param a" },
        { name: "b", text: "(parameter) b: number", documentation: "param b" },
    ],
});

// pick up doccomments from the lambda itself
verify.quickInfoAt("3", "var lambddaNoVarComment: (a: number, b: number) => number", "this is lambda multiplication");

verify.completions({
    marker: "4",
    includes: [
        { name: "lambdaFoo", text: "var lambdaFoo: (a: number, b: number) => number", documentation: "this is lambda comment\nlambdaFoo var comment" },
        { name: "lambddaNoVarComment", text: "var lambddaNoVarComment: (a: number, b: number) => number", documentation: "this is lambda multiplication" },
    ]
});

verify.signatureHelp(
    {
        marker: "5",
        docComment: "this is lambda comment\nlambdaFoo var comment",
        parameterDocComment: "param a",
    },
    {
        marker: "6",
        docComment: "this is lambda comment\nlambdaFoo var comment",
        parameterDocComment: "param b",
    },
);

// no documentation from nested lambda
verify.quickInfos({
    7: "function anotherFunc(a: number): string",
    8: ["(local var) lambdaVar: (b: string) => string", "inner docs\ndocumentation"],
    9: ["(parameter) b: string", "inner parameter"],
    10: "(local var) localVar: string",
    11: "(local var) localVar: string",
    12: ["(parameter) b: string", "inner parameter"],
    13: ["(local var) lambdaVar: (b: string) => string", "inner docs\ndocumentation"],
    14: [
        "var assigned: (s: string) => number",
        "Summary on expression\nOn variable"
    ]
});

verify.completions({
    marker: "15",
    includes: {
        name: "s",
        text: "(parameter) s: string",
        documentation: "On parameter\nparam on expression\nthe first parameter!",
        tags: [
            { name: "param", text: "s param on expression" },
            { name: "param", text: "s the first parameter!" },
        ],
    },
});
verify.quickInfoAt("16", "var assigned: (s: string) => number", "Summary on expression\nOn variable");
verify.completions({
    marker: "17",
    includes: [{
        name: "assigned",
        text: "var assigned: (s: string) => number",
        documentation: "Summary on expression\nOn variable",
        tags: [
            { name: "param", text: "s param on expression" },
            { name: "returns", text: "return on expression" },
            { name: "param", text: "s the first parameter!" },
            { name: "returns", text: "the parameter's length" },
        ],
    },
]});
verify.signatureHelp({
    marker: "18",
    docComment: "Summary on expression\nOn variable",
    parameterDocComment: "On parameter\nparam on expression\nthe first parameter!",
    tags: [
        { name: "param", text: "s param on expression" },
        { name: "returns", text: "return on expression" },
        { name: "param", text: "s the first parameter!" },
        { name: "returns", text: "the parameter's length" },
    ],
});
