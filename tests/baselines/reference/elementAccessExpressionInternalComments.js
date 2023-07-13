//// [tests/cases/compiler/elementAccessExpressionInternalComments.ts] ////

//// [elementAccessExpressionInternalComments.ts]
/*0*/ Array /*1*/[ /*2*/ "toString" /*3*/ ] /*4*/; /*5*/

/*0*/ Array 
    // single line
    /*1*/[ /*2*/ "toString"
    // single line
    /*3*/ ] /*4*/


//// [elementAccessExpressionInternalComments.js]
/*0*/ Array /*1*/[ /*2*/"toString" /*3*/] /*4*/; /*5*/
/*0*/ Array
// single line
/*1*/ [ /*2*/"toString"
// single line
/*3*/ ]; /*4*/
