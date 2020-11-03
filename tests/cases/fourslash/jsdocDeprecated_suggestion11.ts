///<reference path="fourslash.ts" />

// @filename: /foo.ts
/////** @deprecated */
////export function foo() {}

// @filename: /test.ts
////import { [|foo|] } from "./foo";
////[|foo|];

goTo.file("/test.ts");
const [r0, r1] = test.ranges();

verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'foo' is deprecated",
        "reportsDeprecated": true,
        "range": r0
    },
    {
        "code": 6385,
        "message": "'foo' is deprecated",
        "reportsDeprecated": true,
        "range": r1
    }
]);
