/// <reference path='fourslash.ts'/>

////var [|x|] = 10;
////var y = `${ [|x|] } ${ [|x|] }`

test.ranges().forEach(targetRange => {
    goTo.position(targetRange.start);

    test.ranges().forEach(range => {
        verify.referencesAtPositionContains(range);
    }
}