/// <reference path='fourslash.ts'/>

// @Filename: quickInfoJsDocTagsFunctionOverload05.ts
////declare function /*1*/foo(): void;
////
/////**
//// * @tag Tag text
//// */
////declare function /*2*/foo(x: number): void

goTo.marker("1");
verify.verifyQuickInfoDisplayParts(
    "function",
    "declare",
    { start: 17, length: 3 },
    [
        {text:"function",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"foo",kind:"functionName"},
        {text:"(",kind:"punctuation"},
        {text:")",kind:"punctuation"},
        {text:":",kind:"punctuation"},
        {text:" ",kind:"space"},
        {text:"void",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"(",kind:"punctuation"},
        {text:"+",kind:"operator"},
        {text:"1",kind:"numericLiteral"},
        {text:" ",kind:"space"},
        {text:"overload",kind:"text"},
        {text:")",kind:"punctuation"}
    ],
    []);

goTo.marker("2");
verify.verifyQuickInfoDisplayParts(
    "function",
    "declare",
    { start: 73, length: 3 },
    [
        {text:"function",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"foo",kind:"functionName"},
        {text:"(",kind:"punctuation"},
        {text:"x",kind:"parameterName"},
        {text:":",kind:"punctuation"},
        {text:" ",kind:"space"},
        {text:"number",kind:"keyword"},
        {text:")",kind:"punctuation"},
        {text:":",kind:"punctuation"},
        {text:" ",kind:"space"},
        {text:"void",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"(",kind:"punctuation"},
        {text:"+",kind:"operator"},
        {text:"1",kind:"numericLiteral"},
        {text:" ",kind:"space"},
        {text:"overload",kind:"text"},
        {text:")",kind:"punctuation"}
    ],
    [],
    [{ name: "tag", text: "Tag text" }]);
