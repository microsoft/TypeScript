/// <reference path='fourslash.ts' />

// test arrow doc comments
/////** lambdaFoo var comment*/
////var lamb/*1*/daFoo = /** this is lambda comment*/ (/**param a*/a: number, /**param b*/b: number) => a + b;
////var lambddaN/*3*/oVarComment = /** this is lambda multiplication*/ (/**param a*/a: number, /**param b*/b: number) => a * b;
////lambdaFoo(10, 20);

// test nested arrow doc comments
////function /*7*/anotherFunc(a: number) {
////    /** documentation
////        @param b {string} inner parameter */
////    var /*8*/lambdaVar = /** inner docs */(/*9*/b: string) => {
////        var /*10*/localVar = "Hello ";
////        return /*11*/localVar + /*12*/b;
////    }
////    return lamb/*13*/daVar("World") + a;
////}

// test function expression doc comments
/////**
//// * On variable
//// * @param s the first parameter!
//// * @returns the parameter's length
//// */
////var assi/*14*/gned = /**
////                * Summary on expression
////                * @param s param on expression
////                * @returns return on expression
////                */function(/** On parameter */s: string) {
////  return s.length;
////}
////assig/*16*/ned("hey");

verify.baselineQuickInfo()
