/// <reference path="fourslash.ts" />

////const foo = { [|0|]: true };
////foo[[|0|]];

verify.baselineRenameAtRangesWithText("0", { quotePreference: "single" });