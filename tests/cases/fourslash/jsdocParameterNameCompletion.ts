///<reference path="fourslash.ts" />

/////**
//// * @param /*0*/
//// */
////function f(foo, bar) {}

/////**
//// * @param foo
//// * @param /*1*/
//// */
////function g(foo, bar) {}

/////**
//// * @param can/*2*/
//// * @param cantaloupe
//// */
////function h(cat, canary, canoodle, cantaloupe, zebra) {}

/////**
//// * @param /*3*/ {string} /*4*/
//// */
////function i(foo, bar) {}

verify.completions(
    {
        marker: ["0", "3", "4"],
        exact: [
            { name: "foo", kind: "parameter", sortText: completion.SortText.LocationPriority + "0" },
            { name: "bar", kind: "parameter", sortText: completion.SortText.LocationPriority + "1" },
        ],
    },
    {
        marker: "1",
        exact: { name: "bar", kind: "parameter", sortText: completion.SortText.LocationPriority + "1" },
    },
    {
        marker: "2",
        exact: [
            { name: "canary", kind: "parameter", sortText: completion.SortText.LocationPriority + "1" },
            { name: "canoodle", kind: "parameter", sortText: completion.SortText.LocationPriority + "2" },
        ],
    },
);
