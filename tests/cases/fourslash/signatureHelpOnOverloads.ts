/// <reference path='fourslash.ts'/>

////declare function fn(x: string);
////declare function fn(x: string, y: number);
////fn(/*1*/

verify.signatureHelp({
    marker: "1",
    overloadsCount: 2,
    text: "fn(x: string): any",
    parameterName: "x",
    parameterSpan: "x: string",
});

edit.insert("'',");
verify.signatureHelp({
    overloadsCount: 2,
    text: "fn(x: string, y: number): any",
    parameterName: "y",
    parameterSpan: "y: number",
});
