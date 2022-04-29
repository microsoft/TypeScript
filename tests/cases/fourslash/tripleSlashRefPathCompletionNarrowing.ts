/// <reference path='fourslash.ts' />

// Exercises how changes in the basename change the completions offered.
// They should have no effect, as filtering completions is the responsibility of the editor.

// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.ts
//// /*f2*/
// @Filename: d/g.ts
//// /*g*/

// @Filename: test.ts
//// /// <reference path="f/*0*/
//// /// <reference path="./f/*1*/

//// /// <reference path="./d/*2*/

//// /// <reference path="f1/*3*/
//// /// <reference path="[|f1./*4*/|]
//// /// <reference path="[|f1.t/*5*/|]
//// /// <reference path="[|f1.ts/*6*/|]
//// /// <reference path="./f1/*7*/
//// /// <reference path="./[|f1./*8*/|]
//// /// <reference path="./[|f1.t/*9*/|]
//// /// <reference path="./[|f1.ts/*10*/|]

const names = ["f1.ts", "f2.ts", "d"];
const markersWithReplacementSpan = [4, 5, 6, 8, 9, 10];
const ranges = test.ranges();
verify.completions(
    {
        marker: ["0", "1", "2", "3", "7"],
        exact: names,
        isNewIdentifierLocation: true,
    },
    ...markersWithReplacementSpan.map((marker, i): FourSlashInterface.CompletionsOptions => ({
        marker: String(marker),
        exact: names.map(name => ({ name, replacementSpan: ranges[i] })),
        isNewIdentifierLocation: true,
    })),
);
