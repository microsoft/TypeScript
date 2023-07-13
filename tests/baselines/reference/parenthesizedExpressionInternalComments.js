//// [tests/cases/compiler/parenthesizedExpressionInternalComments.ts] ////

//// [parenthesizedExpressionInternalComments.ts]
/*1*/(/*2*/ "foo" /*3*/)/*4*/
;

// open
/*1*/(
    // next
    /*2*/"foo"
    //close
    /*3*/)/*4*/
;


//// [parenthesizedExpressionInternalComments.js]
/*1*/ ( /*2*/"foo" /*3*/) /*4*/;
// open
/*1*/ (
// next
/*2*/ "foo"
//close
/*3*/ ) /*4*/;
