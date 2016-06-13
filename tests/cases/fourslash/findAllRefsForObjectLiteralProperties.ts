/// <reference path='fourslash.ts'/>

////var x = {
////    [|property|]: {}
////};
////
////x.[|property|];
////
////let {[|property|]: pVar} = x;


let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}