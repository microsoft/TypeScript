/// <reference path='fourslash.ts'/>

////const foo = 'foo';
////[|switch|] (foo) {
////   [|case|] 'foo':
////       [|break|];
////   [|default|]:
////       [|break|];
////}

const [r0, r1, r2, r3, r4] = test.ranges();
verify.documentHighlightsOf(r1, [r0, r1, r2, r3, r4]);
verify.documentHighlightsOf(r4, [r0, r1, r2, r3, r4]);
