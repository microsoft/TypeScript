/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
/////**
//// * Doc
//// * @tag Tag text
//// */
////export const x = 0;

// @Filename: /b.ts
////import { x } from "./a";
////x/*b*/;

// @Filename: /c.ts
/////**
//// * Doc 2
//// * @tag Tag text 2
//// */
////import {
////    /**
////     * Doc 3
////     * @tag Tag text 3
////     */
////    x
////} from "./a";
////x/*c*/;

goTo.eachMarker((_, index) => {
    verify.verifyQuickInfoDisplayParts(
        "alias",
        "",
        { start: index === 0 ? 25 : 117, length: 1 },
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
});
