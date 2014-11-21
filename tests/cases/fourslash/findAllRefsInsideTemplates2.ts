/// <reference path='fourslash.ts'/>

////function [|f|](...rest: any[]) { }
////[|f|] `${ [|f|] } ${ [|f|] }`

test.ranges().forEach(targetRange => {
    goTo.position(targetRange.start);

    test.ranges().forEach(range => {
        verify.referencesAtPositionContains(range);
    });
});