/// <reference path="fourslash.ts" />

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
        { name: "compile", sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority) },
    ]
});
