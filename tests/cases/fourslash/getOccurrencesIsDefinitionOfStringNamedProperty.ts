/// <reference path='fourslash.ts' />
////let o = { "[|{| "isDefinition": true |}x|]": 12 };
////let y = o.[|x|];

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: '(property) "x": number', ranges }]);
verify.referenceGroups(r1, [
    { definition: '(property) "x": number', ranges: [r0] },
    { definition: '(property) "x": number', ranges: [r1] },
]);
