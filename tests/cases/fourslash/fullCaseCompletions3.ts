/// <reference path="fourslash.ts" />


// @Filename: /main.ts
//// enum E {
////     A = 0,
////     B = "B",
////     C = "C",
//// }
//// declare const u: E.A | E.B | 1 | 1n | "1";
//// switch (u) {
////     case E.A:
////     case 1:
////     case 1n:
////     case "1":
////     case `1`:
////     case `1${u}`:
////     case /*1*/
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: [
            // {
            //     name: "A",
            //     sortText: completion.SortText.LocationPriority,
            // },
            // {
            //     name: "B",
            //     sortText: completion.SortText.LocationPriority,
            // }
        ],
        excludes: [
            // >> TODO: exclude C
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
);

// verify.applyCodeActionFromCompletion("1", {
//     name: "case E.A: ...",
//     source: "SwitchCases/",
//     description: "Includes imports of types referenced by 'case E.A: ...'",
//     newFileContent: 
// `import { E, u } from "./dep";
// switch (u) {
//     case 
// }`,
// })

// verify.applyCodeActionFromCompletion("2", {
//     name: "case E.A: ...",
//     source: "SwitchCases/",
//     description: "Includes imports of types referenced by 'case E.A: ...'",
//     newFileContent: 
// `import * as d from "./dep";
// import { E, u } from "./dep";
// switch (d.u) {
//     case 
// }`,
// })