/// <reference path="fourslash.ts" />

// Import-related cases

// @newline: LF
// @Filename: /dep.ts
//// export enum E {
////     A = 0,
////     B = "B",
////     C = "C",
//// }
//// declare const u: E.A | E.B | 1;
//// export { u };

// @Filename: /main.ts
//// import { u } from "./dep";
//// switch (u) {
////     case/*1*/
//// }

// @Filename: /other.ts
//// import * as d from "./dep";
//// declare const u: d.E;
//// switch (u) {
////     case/*2*/
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case E.A: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case E.A:
case E.B:
case 1:`,
                hasAction: true,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
    {
        marker: "2",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case d.E.A: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case d.E.A:
case d.E.B:
case d.E.C:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
);

verify.applyCodeActionFromCompletion("1", {
    name: "case E.A: ...",
    source: "SwitchCases/",
    description: "Includes imports of types referenced by 'case E.A: ...'",
    newFileContent: 
`import { E, u } from "./dep";
switch (u) {
    case
}`,
});