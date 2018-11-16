/// <reference path='fourslash.ts'/>

////declare function f(s: string);
////declare function f(n: number);
////declare function f(s: string, b: boolean);
////declare function f(n: number, b: boolean);
////
////f(1/**/

verify.signatureHelp({
    marker: "",
    overloadsCount: 4,
    text: "f(n: number): any",
    parameterName: "n",
    parameterSpan: "n: number",
});

edit.insert(", ");
verify.signatureHelp({
    overloadsCount: 4,
    text: "f(n: number, b: boolean): any",
    parameterName: "b",
    parameterSpan: "b: boolean",
});
