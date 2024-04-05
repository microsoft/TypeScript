///<reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////export default function a() {}

// @filename: /b.ts
////import _a from "./a";
////export {
////	/** @deprecated a is deprecated */
////	_a as a,
////};
/////** @deprecated b is deprecated */
////export const b = (): void => {};

// @filename: /c.ts
////import * as _ from "./b";
////
////_.[|a|]()
////_.[|b|]()

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
        "message": "'b' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[1]
    },
]);

