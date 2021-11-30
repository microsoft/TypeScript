/// <reference path="fourslash.ts" />

////let v = 100;
/////a/./**/

verify.completions({ marker: "", exact: completion.sorted(["exec", "test", "source", "global", "ignoreCase", "multiline", "lastIndex", { name: "compile", sortText: completion.SortText.DeprecatedLocationPriority }]) });
