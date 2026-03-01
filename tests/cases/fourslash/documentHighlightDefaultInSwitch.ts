/// <reference path='fourslash.ts'/>

////const foo = 'foo';
////[|switch|] (foo) {
////   [|case|] 'foo':
////       [|break|];
////   [|default|]:
////       [|break|];
////}

const [r0, r1, r2, r3, r4] = test.ranges();
verify.baselineDocumentHighlights([r1, r4]);
