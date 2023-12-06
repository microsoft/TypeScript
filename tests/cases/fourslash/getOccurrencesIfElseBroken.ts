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

verify.baselineDocumentHighlights();
verify.baselineDocumentHighlights("");
