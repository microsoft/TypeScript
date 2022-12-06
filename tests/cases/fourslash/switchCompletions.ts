/// <reference path="fourslash.ts" />

//// enum E { A, B }
//// declare const e: E;
//// switch (e) {
////     case E.A:
////         return 0;
////     case E./*1*/
//// }
//// declare const f: 1 | 2 | 3;
//// switch (f) {
////     case 1:
////         return 1;
////     case /*2*/
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: ["B"],
        excludes: "A",
    },
    {
        marker: "2",
        isNewIdentifierLocation: false,
        excludes: "1",
        includes: ["2", "3"],
    }
);

// verify.completions(
//     {
//         marker: "1",
//         isNewIdentifierLocation: false,
//         includes: [
//             {
//                 name: "case E.A: ...",
//                 source: completion.CompletionSource.SwitchCases,
//                 sortText: completion.SortText.GlobalsOrKeywords,
//                 insertText:
// `case E.A:
// case E.B:
// case 1:`,
//             },
//         ],
//         preferences: {
//             includeCompletionsWithInsertText: true,
//         },
//     },
//     {
//         marker: "2",
//         isNewIdentifierLocation: false,
//         includes: [
//             {
//                 name: "case E.A: ...",
//                 source: completion.CompletionSource.SwitchCases,
//                 sortText: completion.SortText.GlobalsOrKeywords,
//                 insertText:
// `case E.A:
// case E.B:
// case E.C:`,
//             },
//         ],
//         preferences: {
//             includeCompletionsWithInsertText: true,
//         },
//     },
//     {
//         marker: "3",
//         isNewIdentifierLocation: false,
//         includes: [
//             {
//                 name: "case F.D: ...",
//                 source: completion.CompletionSource.SwitchCases,
//                 sortText: completion.SortText.GlobalsOrKeywords,
//                 insertText:
// `case F.D:
// case F.E:
// case F.F:`,
//             },
//         ],
//         preferences: {
//             includeCompletionsWithInsertText: true,
//         },
//     },
//     {
//         marker: "3",
//         isNewIdentifierLocation: false,
//         includes: [
//             {
//                 name: "case F.D: ...",
//                 source: completion.CompletionSource.SwitchCases,
//                 sortText: completion.SortText.GlobalsOrKeywords,
//                 isSnippet: true,
//                 insertText:
// `case F.D:$1
// case F.E:$2
// case F.F:$3`,
//             },
//         ],
//         preferences: {
//             includeCompletionsWithInsertText: true,
//             includeCompletionsWithSnippetText: true,
//         },
//     },
// );