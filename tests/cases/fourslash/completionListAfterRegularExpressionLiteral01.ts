/// <reference path="fourslash.ts" />

////let v = 100;
/////a/./**/

verify.completions({
    marker: "",
    unsorted: [
        "exec",
        "test",
        "source",
        "global",
        "ignoreCase",
        "multiline",
        "lastIndex",
        { name: "compile", sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority) }
    ]
});
