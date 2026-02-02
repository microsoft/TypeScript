///<reference path="fourslash.ts" />

// Tests that @param completions are sorted by argument position (not alphabetically).
// See https://github.com/microsoft/TypeScript/issues/20183

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

// sortText uses LocationPriority ("11") + zero-padded index to maintain argument order
const locationPriority = completion.SortText.LocationPriority;
verify.completions(
    {
        marker: ["0", "3", "4"],
        exact: [
            { name: "foo", sortText: locationPriority + "0000" },
            { name: "bar", sortText: locationPriority + "0001" },
        ],
    },
    {
        marker: "1",
        // bar is the second parameter (index 1), already documented foo is filtered out
        exact: { name: "bar", sortText: locationPriority + "0001" },
    },
    {
        marker: "2",
        // canary is index 1, canoodle is index 2 (cat=0, cantaloupe=3 filtered)
        exact: [
            { name: "canary", sortText: locationPriority + "0001" },
            { name: "canoodle", sortText: locationPriority + "0002" },
        ],
    },
);
