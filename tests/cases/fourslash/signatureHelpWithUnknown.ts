/// <reference path='fourslash.ts'/>

////eval(\/*1*/

verify.signatureHelp({
    marker: "1",
    text: "eval(x: string): any",
    docComment: "Evaluates JavaScript code and executes it.",
    parameterDocComment: "A String value that contains valid JavaScript code.",
    tags: [{ name: "param", text: "x A String value that contains valid JavaScript code." }],
});
