/// <reference path="fourslash.ts" />

////const foo = { 0: true };
////foo[[|{| "contextRangeIndex": 0 |}0|]];

verify.baselineRenameAtRangesWithText("0");