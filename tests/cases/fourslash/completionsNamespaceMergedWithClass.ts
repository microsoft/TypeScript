/// <reference path='fourslash.ts'/>

////class C {
////    static m() { }
////}
////
////class D extends C {}
////namespace D {
////    export type T = number;
////}
////
////let x: D./*type*/;
////D./*value*/

verify.completions(
    { marker: "type", exact: "T" },
    {
        marker: "value",
        exact: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "m", sortText: completion.SortText.LocalDeclarationPriority },
            ...completion.functionMembers
        ]
    },
);
