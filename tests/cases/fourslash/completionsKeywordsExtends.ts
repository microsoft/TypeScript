/// <reference path="fourslash.ts" />

////class C/*a*/ /*b*/ { }
////class C e/*c*/ {}

// Tests that `isCompletionListBlocker` is true *at* the class name, but false *after* it.

verify.completions(
    { marker: "a", exact: undefined },
    { marker: ["b", "c"], includes: "extends" },
);
