/// <reference path="fourslash.ts" />

// @strict: true
// @jsx: preserve
// @Filename: index.tsx

//// /** @jsxImportSource @emotion/react */
//// import { css } from "@emotion/react";
//// function Component1() {
////   return (
////     <input
////       css={css`
////         color: red;
////       `}
////     />
////   );
//// }
//// [|function Component2() {
////     return (
////        <Component1>
////        <input
////        css={css`
////            color: red;
////        `}
////        />
////    </Component1>
////  );
//// }|]
//// /*e*/

const [r0] = test.ranges();
// Baseline
const expected = test.getSemanticDiagnostics();
console.log(JSON.stringify(expected));

// Reset checker
goTo.marker("e");
edit.insert("  ");

verify.getRegionSemanticDiagnostics([r0], expected);
verify.getSemanticDiagnostics(expected);