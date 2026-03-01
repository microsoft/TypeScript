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
////export {
////    a
////} from "./b";

// @filename: /d.ts
////import * as _ from "./c";
////_.[|a|]

goTo.file("/d.ts")
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'a' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[0]
    },
]);
