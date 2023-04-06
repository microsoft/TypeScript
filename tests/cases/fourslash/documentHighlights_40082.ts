/// <reference path="fourslash.ts" />
// #40082

// @checkJs: true
//// export = (state, messages) => {
////    export [|default|] {
////    }
//// }

const [r] = test.ranges();
verify.baselineDocumentHighlights(r);
