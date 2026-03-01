/// <reference path="fourslash.ts" />

// @Filename: file1.ts
//// const a: "aa" | "bb" = "/**/"

verify.baselineCompletions({
    includeInsertTextCompletions: true,
});