/// <reference path="fourslash.ts" />

////type T = `${"prefix1"|"prefix2"}${string}${"middle1"|"middle2"}${string}${"suffix1"|"suffix2"}`;
////let x: T = /*1*/
////x = "/*2a*/
////x = "/*2b*/"
////x = "pre/*3a*/
////x = "pre/*3b*/"
////x = "prefix1_/*4a*/
////x = "prefix1_/*4b*/"
////x = "prefix1_middle1_/*5a*/
////x = "prefix1_middle1_/*5b*/"
////x = "prefix1_middle1_suffix1/*6a*/
////x = "prefix1_middle1_suffix1/*6b*/"


/*verify.completions({
    marker: "1",
    unsorted: ['"prefix1"', '"prefix2"']
});*/
/*verify.completions({
    marker: "2a",
    unsorted: ["prefix1", "prefix2"]
});
verify.completions({
    marker: "2b",
    unsorted: ["prefix1", "prefix2"]
});
verify.completions({
    marker: "3a",
    unsorted: ["prefix1", "prefix2"]
});
verify.completions({
    marker: "3b",
    unsorted: ["prefix1", "prefix2"]
});*/
verify.completions({
    marker: "4a",
    unsorted: ["prefix1_middle1", "prefix1_middle2"]
});
verify.completions({
    marker: "4b",
    unsorted: ["prefix1_middle1", "prefix1_middle2"]
});
verify.completions({
    marker: "5a",
    unsorted: ["prefix1_middle1_suffix1", "prefix1_middle1_suffix2"]
});
verify.completions({
    marker: "5b",
    unsorted: ["prefix1_middle1_suffix1", "prefix1_middle1_suffix2"]
});
verify.completions({
    marker: "6a",
    unsorted: ["prefix1_middle1_suffix1", "prefix1_middle1_suffix1suffix1"]
});
verify.completions({
    marker: "6b",
    unsorted: ["prefix1_middle1_suffix1", "prefix1_middle1_suffix1suffix2"]
});
