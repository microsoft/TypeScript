/// <reference path='fourslash.ts'/>

////export default class [|DefaultExportedClass|] {
////}
////
////var x: [|DefaultExportedClass|];
////
////var y = new [|DefaultExportedClass|];

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}