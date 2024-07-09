/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////export const a = 1;
////export const b = 1;

// @filename: /b.ts
////export {
////    /** @deprecated a is deprecated */
////    a
////} from "./a";

// @filename: /c.ts
////import { [|a|] } from "./b";
////[|a|]

goTo.file("/c.ts")

verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'a' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[0]
    },
    {
        "code": 6385,
        "message": "'a' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[1]
    },
]);
