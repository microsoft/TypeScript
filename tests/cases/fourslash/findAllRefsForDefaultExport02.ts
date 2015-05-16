/// <reference path='fourslash.ts'/>

////export default function [|DefaultExportedFunction|]() {
////    return [|DefaultExportedFunction|]
////}
////
////var x: typeof [|DefaultExportedFunction|];
////
////var y = [|DefaultExportedFunction|]();
////
////namespace [|DefaultExportedFunction|] {
////    var local = 100;
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}