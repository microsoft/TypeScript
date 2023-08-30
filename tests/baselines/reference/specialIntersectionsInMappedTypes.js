//// [tests/cases/compiler/specialIntersectionsInMappedTypes.ts] ////

//// [specialIntersectionsInMappedTypes.ts]
// Repro from #50683

type Alignment = (string & {}) | "left" | "center" | "right";
type Alignments = Record<Alignment, string>;

const a: Alignments = {
    left: "align-left",
    center: "align-center",
    right: "align-right",
    other: "align-other",
};

a.left.length;
a.other.length;  // Error expected here


//// [specialIntersectionsInMappedTypes.js]
"use strict";
// Repro from #50683
var a = {
    left: "align-left",
    center: "align-center",
    right: "align-right",
    other: "align-other",
};
a.left.length;
a.other.length; // Error expected here
