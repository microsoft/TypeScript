/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
/////**
//// * Doc
//// * @tag Tag text
//// */
////export const x = 0;

// @Filename: /b.ts
////import { x } from "./a";
////x/**/;

goTo.marker("");
verify.verifyQuickInfoDisplayParts(
    "alias",
    "",
    { start: 25, length: 1 },
    [
        { text:"(",kind:"punctuation" },
        { text:"alias",kind:"text" },
        { text:")",kind:"punctuation" },
        { text:" ",kind:"space" },
        { text:"const",kind:"keyword" },
        { text:" ",kind:"space" },
        { text:"x",kind:"aliasName" },
        { text:":",kind:"punctuation" },
        { text:" ",kind:"space" },
        { text:"0",kind:"stringLiteral" },
        { text:"\n",kind:"lineBreak" },
        { text:"import",kind:"keyword" },
        { text:" ",kind:"space" },
        { text:"x",kind:"aliasName" },
    ],
    [{ text: "Doc", kind: "text" }],
    [{ name: "tag", text: "Tag text" }]);
