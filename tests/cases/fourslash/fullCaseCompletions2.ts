/// <reference path="fourslash.ts" />

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
////     case /*1*/
//// }

// @Filename: /other.ts
//// import * as d from "./dep";
//// switch (d.u) {
////     case /*2*/
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
    {
        marker: "2",
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