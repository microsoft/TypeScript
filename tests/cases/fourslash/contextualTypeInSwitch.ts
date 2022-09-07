/// <reference path="fourslash.ts" />

//// enum E {
////     A = 0,
////     B = "B",
////     C = "C",
//// }
//// declare const u: E.A | E.B | 1;
//// switch (u) {
////     case /*1*/
//// }
//// declare const e: E;
//// switch (e) {
////     case /*2*/   
//// }
//// enum F {
////     D = 1 << 0,
////     E = 1 << 1,
////     F = 1 << 2,
//// }
//// declare const f: F;
//// switch (f) {
////     case /*3*/
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
            // },
            // {
            //     name: "C",
            //     sortText: completion.SortText.LocationPriority,
            // }
        ],
    },
    {
        marker: "3",
        isNewIdentifierLocation: false,
        includes: [
            // {
            //     name: "D",
            //     sortText: completion.SortText.LocationPriority,
            // },
            // {
            //     name: "E",
            //     sortText: completion.SortText.LocationPriority,
            // },
            // {
            //     name: "F",
            //     sortText: completion.SortText.LocationPriority,
            // }
        ],
    },
);