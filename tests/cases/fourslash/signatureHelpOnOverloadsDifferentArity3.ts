/// <reference path='fourslash.ts'/>

////declare function f();
////declare function f(s: string);
////declare function f(s: string, b: boolean);
////declare function f(n: number, b: boolean);
////
////f(/**/

verify.signatureHelp({
    marker: "",
    overloadsCount: 4,
    text: "f(): any",
    parameterCount: 0,
    argumentCount: 0,
});

edit.insert("x, ");
verify.signatureHelp({
    overloadsCount: 4,
    text: "f(s: string, b: boolean): any",
    parameterCount: 2,
    parameterName: "b",
    parameterSpan: "b: boolean",
});

edit.insert("x, ");
verify.signatureHelp({
    overloadsCount: 4,
    text: "f(s: string, b: boolean): any",
    parameterCount: 2,
});
