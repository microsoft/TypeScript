/// <reference path='fourslash.ts' />

/////** This comment should appear for foo*/
////function f/*6*/oo() {
////}
////f/*7*/oo/*4*/(/*1*/);
/////** This is comment for function signature*/
////function fo/*8*/oWithParameters(/** this is comment about a*/a: string,
////    /** this is comment for b*/
////    b: number) {
////    var /*20*/d = /*10*/a;
////}
////fooWithParam/*9*/eters/*5*/(/*2*/"a",/*3*/10);
/////** lamdaFoo var comment*/
////var lamb/*11*/daFoo = /** this is lambda comment*/ (/**param a*/a: number, /**param b*/b: number) => /*18*/a + b;
////var lambddaN/*12*/oVarComment = /** this is lambda multiplication*/ (/**param a*/a: number, /**param b*/b: number) => a * b;
/////*13*/lambdaFoo(/*14*/10, /*15*/20);
////lambddaNoVarComment(/*16*/10, /*17*/20);
/////**
////* Does something
////* @param a a string
////*/
////declare function fn(a: string);
////fn(/*19*/"hello");
////var lambdaA/*20a*/notherFunc = (/*21*/a: number) => {
////    var bb/*22*/bb = 10;
////    return /*24*/a + b/*23*/bbb;
////}
////function /*25*/anotherFunc(/*26*/a: number) {
////    var /*27a*/lambdaVar = (/*27*/b: string) => {
////        var /*28*/localVar = "Hello ";
////        return /*29*/localVar + /*30*/b;
////    }
////    return lamb/*31*/daVar("World") + /*32*/a;
////}

goTo.marker('1');
verify.currentSignatureHelpDocCommentIs("This comment should appear for foo");

goTo.marker('2');
verify.currentSignatureHelpDocCommentIs("This is comment for function signature");
verify.currentParameterHelpArgumentDocCommentIs("this is comment about a");

goTo.marker('3');
verify.currentSignatureHelpDocCommentIs("This is comment for function signature");
verify.currentParameterHelpArgumentDocCommentIs("this is comment for b");

goTo.marker('4');
verify.completionListContains('foo', '(function) foo(): void', 'This comment should appear for foo');

goTo.marker('5');
verify.completionListContains('fooWithParameters', '(function) fooWithParameters(a: string, b: number): void', 'This is comment for function signature');

goTo.marker('6');
verify.quickInfoIs("(function) foo(): void", "This comment should appear for foo");

goTo.marker('7');
verify.quickInfoIs("(function) foo(): void", "This comment should appear for foo");

goTo.marker('8');
verify.quickInfoIs("(function) fooWithParameters(a: string, b: number): void", "This is comment for function signature");

goTo.marker('9');
verify.quickInfoIs("(function) fooWithParameters(a: string, b: number): void", "This is comment for function signature");

goTo.marker('10');
verify.completionListContains('a', '(parameter) a: string', 'this is comment about a');
verify.completionListContains('b', '(parameter) b: number', 'this is comment for b');

goTo.marker('11');
verify.quickInfoIs("(var) lambdaFoo: (a: number, b: number) => number", "lamdaFoo var comment");

goTo.marker('12');
verify.quickInfoIs("(var) lambddaNoVarComment: (a: number, b: number) => number", "");

goTo.marker('13');
verify.completionListContains('lambdaFoo', '(var) lambdaFoo: (a: number, b: number) => number', '');
verify.completionListContains('lambddaNoVarComment', '(var) lambddaNoVarComment: (a: number, b: number) => number', '');

goTo.marker('14');
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('15');
verify.currentParameterHelpArgumentDocCommentIs("param b");

goTo.marker('16');
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('17');
verify.currentParameterHelpArgumentDocCommentIs("param b");

goTo.marker('18');
verify.completionListContains('a', '(parameter) a: number', 'param a');
verify.completionListContains('b', '(parameter) b: number', 'param b');

goTo.marker('19');
verify.currentSignatureHelpDocCommentIs("Does something");
verify.currentParameterHelpArgumentDocCommentIs("a string");

goTo.marker('20');
verify.quickInfoIs('(local var) d: string', '');

goTo.marker('20a');
verify.quickInfoIs('(var) lambdaAnotherFunc: (a: number) => number', '');
goTo.marker('21');
verify.quickInfoIs('(parameter) a: number', '');
goTo.marker('22');
verify.quickInfoIs('(local var) bbbb: number', '');
goTo.marker('23');
verify.quickInfoIs('(local var) bbbb: number', '');
goTo.marker('24');
verify.quickInfoIs('(parameter) a: number', '');

goTo.marker('25');
verify.quickInfoIs('(function) anotherFunc(a: number): string', '');
goTo.marker('26');
verify.quickInfoIs('(parameter) a: number', '');
goTo.marker('27a');
verify.quickInfoIs('(local var) lambdaVar: (b: string) => string', '');
goTo.marker('27');
verify.quickInfoIs('(parameter) b: string', '');
goTo.marker('28');
verify.quickInfoIs('(local var) localVar: string', '');
goTo.marker('29');
verify.quickInfoIs('(local var) localVar: string', '');
goTo.marker('30');
verify.quickInfoIs('(parameter) b: string', '');
goTo.marker('31');
verify.quickInfoIs('(local var) lambdaVar: (b: string) => string', '');
goTo.marker('32');
verify.quickInfoIs('(parameter) a: number', '');
