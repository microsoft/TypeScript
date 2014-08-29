/// <reference path='fourslash.ts' />


////[|if|] (true) {
////    var x = 1;
////}
////[|else     if|] ()
////[|else if|]
////[|else|]  /*  whar garbl   */   [|if|] (i/**/f (true) { } else { })
////else

// It would be nice if in the future,
// We could include that last 'else'.

test.ranges().forEach(r => {
    goTo.position(r.start);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
});

goTo.marker();
verify.occurrencesAtPositionCount(2);