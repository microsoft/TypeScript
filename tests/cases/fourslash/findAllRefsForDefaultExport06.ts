/// <reference path='fourslash.ts'/>

////function [|f|]() {
////    return 100;
////}
////
////export default /**/[|f|];
////
////var x: typeof [|f|];
////
////var y = [|f|]();
////
////namespace [|f|] {
////}

// The function 'f' and the namespace 'f' don't get merged,
// but the 'export default' site, includes both meanings.

// Here we are testing whether the 'export default' site
// and all value-uses of 'f' are included in the references to the function.

goTo.marker();
let ranges = test.ranges();
verify.referencesCountIs(ranges.length);

for (let expectedReference of ranges) {
    verify.referencesAtPositionContains(expectedReference);
}
