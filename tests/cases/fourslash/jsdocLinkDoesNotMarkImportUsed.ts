/// <reference path="fourslash.ts" />

// @noUnusedLocals: true

// @Filename: /a.ts
////export interface A {}

// @Filename: /b.ts
////[|import type { A } from "./a";|]
/////** {@link /*link*/A} */
////export interface B {}

goTo.marker("link");
verify.baselineQuickInfo();

verify.getSemanticDiagnostics([{
    message: "'A' is declared but its value is never read.",
    code: 6133,
    range: test.ranges()[0],
    reportsUnnecessary: true,
}]);
