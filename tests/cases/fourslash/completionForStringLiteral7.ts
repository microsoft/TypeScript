/// <reference path='fourslash.ts'/>

////type T = "foo" | "bar";
////type U = "oof" | "rab";
////function f(x: T, ...args: U[]) { };
////f("[|/*1*/|]", "[|/*2*/|]", "[|/*3*/|]");

verify.completions(
    { marker: "1", exact: ["foo", "bar"].map(name => ({
        name, replacementSpan: test.ranges()[0]
    })) },
    { marker: "2", exact: ["oof", "rab"].map(name => ({
        name, replacementSpan: test.ranges()[1]
    })) },
    { marker: "3", exact: ["oof", "rab"].map(name => ({
        name, replacementSpan: test.ranges()[2]
    })) },
);
