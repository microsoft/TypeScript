/// <reference path="fourslash.ts" />

//// declare const f: "foo" | "bar" | "baz";
//// switch (f) {
////     case "/*1*/" as const:
//// }
//// switch (f) {
////     case "foo" as const:
////     case "/*2*/":
//// }
//// switch (f) {
////     case "foo" as const:
////     case "/*3*/" as const:
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: ["foo", "bar", "baz"],
    },
    {
        marker: ["2", "3"],
        isNewIdentifierLocation: false,
        includes: ["bar", "baz"],
        excludes: "foo",
    },
);
