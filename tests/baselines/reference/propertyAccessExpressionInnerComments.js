//// [tests/cases/compiler/propertyAccessExpressionInnerComments.ts] ////

//// [propertyAccessExpressionInnerComments.ts]
/*1*/Array/*2*/./*3*/toString/*4*/

/*1*/Array
/*2*/./*3*/
    // Single-line comment
    toString/*4*/

/*1*/Array/*2*/./*3*/
    // Single-line comment
    toString/*4*/

/*1*/Array
    // Single-line comment
    /*2*/./*3*/toString/*4*/

/* Existing issue: the "2" comments below are duplicated and "3"s are missing */

/*1*/Array/*2*/?./*3*/toString/*4*/

/*1*/Array
/*2*/?./*3*/
    // Single-line comment
    toString/*4*/

/*1*/Array/*2*/?./*3*/
    // Single-line comment
    toString/*4*/

/*1*/Array
    // Single-line comment
    /*2*/?./*3*/toString/*4*/


//// [propertyAccessExpressionInnerComments.js]
/*1*/ Array /*2*/. /*3*/toString; /*4*/
/*1*/ Array
    /*2*/ . /*3*/
        // Single-line comment
        toString; /*4*/
/*1*/ Array /*2*/. /*3*/
    // Single-line comment
    toString; /*4*/
/*1*/ Array
    // Single-line comment
    /*2*/ . /*3*/toString; /*4*/
/* Existing issue: the "2" comments below are duplicated and "3"s are missing */
/*1*/ Array /*2*/ === null || Array /*2*/ === void 0 ? void 0 : Array /*2*/.toString; /*4*/
/*1*/ Array === null || Array === void 0 ? void 0 : Array
/*2*/ .
// Single-line comment
toString; /*4*/
/*1*/ Array /*2*/ === null || Array /*2*/ === void 0 ? void 0 : Array /*2*/.
// Single-line comment
toString; /*4*/
/*1*/ Array === null || Array === void 0 ? void 0 : Array
// Single-line comment
/*2*/ .toString; /*4*/
