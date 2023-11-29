/// <reference path="fourslash.ts" />

// @newline: LF
////switch (Math.random() ? 123 : 456) {
////    case "foo!":
////    case/**/
////}

verify.baselineCompletions({
    includeCompletionsWithInsertText: true,
})
