/// <reference path='fourslash.ts' />

// test arrow doc comments
/////** lamdaFoo var comment*/
////var lamb/*1*/daFoo = /** this is lambda comment*/ (/**param a*/a: number, /**param b*/b: number) => /*2*/a + b;
////var lambddaN/*3*/oVarComment = /** this is lambda multiplication*/ (/**param a*/a: number, /**param b*/b: number) => a * b;
/////*4*/lambdaFoo(/*5*/10, /*6*/20);

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
////  return /*15*/s.length;
////}
////assig/*16*/ned/*17*/(/*18*/"hey");



goTo.marker('1');
verify.quickInfoIs("var lambdaFoo: (a: number, b: number) => number", "lamdaFoo var comment\nthis is lambda comment");

goTo.marker('2');
verify.completionListContains('a', '(parameter) a: number', 'param a');
verify.completionListContains('b', '(parameter) b: number', 'param b');

goTo.marker('3');
// pick up doccomments from the lambda itself
verify.quickInfoIs("var lambddaNoVarComment: (a: number, b: number) => number", "this is lambda multiplication");

goTo.marker('4');
verify.completionListContains('lambdaFoo', 'var lambdaFoo: (a: number, b: number) => number', 'lamdaFoo var comment\nthis is lambda comment');
verify.completionListContains('lambddaNoVarComment', 'var lambddaNoVarComment: (a: number, b: number) => number', 'this is lambda multiplication');

goTo.marker('5');
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('6');
verify.currentParameterHelpArgumentDocCommentIs("param b");




goTo.marker('7');
// no documentation from nested lambda
verify.quickInfoIs('function anotherFunc(a: number): string', '');
goTo.marker('8');
verify.quickInfoIs('(local var) lambdaVar: (b: string) => string', 'documentation\ninner docs ');
goTo.marker('9');
verify.quickInfoIs('(parameter) b: string', 'inner parameter ');
goTo.marker('10');
verify.quickInfoIs('(local var) localVar: string', '');
goTo.marker('11');
verify.quickInfoIs('(local var) localVar: string', '');
goTo.marker('12');
verify.quickInfoIs('(parameter) b: string', 'inner parameter ');
goTo.marker('13');
verify.quickInfoIs('(local var) lambdaVar: (b: string) => string', 'documentation\ninner docs ');

goTo.marker('14');
verify.quickInfoIs("var assigned: (s: string) => number", "On variable\nSummary on expression");
goTo.marker('15');
verify.completionListContains('s', '(parameter) s: string', "the first parameter!\nparam on expression\nOn parameter ");
goTo.marker('16');
verify.quickInfoIs("var assigned: (s: string) => number", "On variable\nSummary on expression");
goTo.marker('17');
verify.completionListContains("assigned", "var assigned: (s: string) => number", "On variable\nSummary on expression");
goTo.marker('18');
verify.currentSignatureHelpDocCommentIs("On variable\nSummary on expression");
verify.currentParameterHelpArgumentDocCommentIs("the first parameter!\nparam on expression\nOn parameter ");

