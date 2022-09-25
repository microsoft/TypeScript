/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////const a = 1;
////const b = 1;
////export { a, /** @deprecated b is deprecated */ b }

// @filename: /b.ts
////import { [|b|] } from "./a";
////[|b|]

goTo.file("/b.ts")
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'b' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[0]
    },
    {
        "code": 6385,
        "message": "'b' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[1]
    },
]);
