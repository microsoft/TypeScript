/// <reference path='fourslash.ts' />

////foo(1, 2); /**a*/
/////**b*/ function /*a*/foo/*b*/(/**this1*/ this /**this2*/: /**void1*/ void /**void2*/, /**c*/ a /**d*/: /**e*/ number /**f*/, /**g*/ b /**h*/: /**i*/ number /**j*/ = /**k*/ 1 /**l*/) {
////    // m
////    /**n*/ return a + b; // o
////    // p
////} // q
/////**r*/ foo(1);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `foo({ a: 1, b: 2 }); /**a*/
/**b*/ function foo(/**this1*/ this /**this2*/: /**void1*/ void /**void2*/, { a, b = /**k*/ 1 /**l*/ }: { /**c*/ a /**d*/: /**e*/ number /**f*/; /**g*/ b /**h*/?: /**i*/ number /**j*/; }) {
    // m
    /**n*/ return a + b; // o
    // p
} // q
/**r*/ foo({ a: 1 });`
});