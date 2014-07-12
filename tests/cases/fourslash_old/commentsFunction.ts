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
verify.completionListContains('foo', '(): void', 'This comment should appear for foo', "foo", "function");

goTo.marker('5');
verify.completionListContains('fooWithParameters', '(a: string, b: number): void', 'This is comment for function signature', "fooWithParameters", "function");

goTo.marker('6');
verify.quickInfoIs("(): void", "This comment should appear for foo", "foo", "function");

goTo.marker('7');
verify.quickInfoIs("(): void", "This comment should appear for foo", "foo", "function");

goTo.marker('8');
verify.quickInfoIs("(a: string, b: number): void", "This is comment for function signature", "fooWithParameters", "function");

goTo.marker('9');
verify.quickInfoIs("(a: string, b: number): void", "This is comment for function signature", "fooWithParameters", "function");

goTo.marker('10');
verify.completionListContains('a', 'string', 'this is comment about a', "a", "parameter");
verify.completionListContains('b', 'number', 'this is comment for b', "b", "parameter");

goTo.marker('11');
verify.quickInfoIs("(a: number, b: number) => number", "lamdaFoo var comment", "lambdaFoo", "var");

goTo.marker('12');
verify.quickInfoIs("(a: number, b: number) => number", "", "lambddaNoVarComment", "var");

goTo.marker('13');
verify.completionListContains('lambdaFoo', '(a: number, b: number) => number', 'lamdaFoo var comment', "lambdaFoo", "var");
verify.completionListContains('lambddaNoVarComment', '(a: number, b: number) => number', '', "lambddaNoVarComment", "var");

goTo.marker('14');
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('15');
verify.currentParameterHelpArgumentDocCommentIs("param b");

goTo.marker('16');
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('17');
verify.currentParameterHelpArgumentDocCommentIs("param b");

goTo.marker('18');
verify.completionListContains('a', 'number', 'param a', "a", "parameter");
verify.completionListContains('b', 'number', 'param b', "b", "parameter");

goTo.marker('19');
verify.currentSignatureHelpDocCommentIs("Does something");
verify.currentParameterHelpArgumentDocCommentIs("a string");

goTo.marker('20');
verify.quickInfoIs('string', '', 'd', "local var");

goTo.marker('20a');
verify.quickInfoIs('(a: number) => number', '', 'lambdaAnotherFunc', "var");
goTo.marker('21');
verify.quickInfoIs('number', '', 'a', "parameter");
goTo.marker('22');
verify.quickInfoIs('number', '', 'bbbb', "local var");
goTo.marker('23');
verify.quickInfoIs('number', '', 'bbbb', "local var");
goTo.marker('24');
verify.quickInfoIs('number', '', 'a', "parameter");

goTo.marker('25');
verify.quickInfoIs('(a: number): string', '', 'anotherFunc', "function");
goTo.marker('26');
verify.quickInfoIs('number', '', 'a', "parameter");
goTo.marker('27a');
verify.quickInfoIs('(b: string) => string', '', 'lambdaVar', "local var");
goTo.marker('27');
verify.quickInfoIs('string', '', 'b', "parameter");
goTo.marker('28');
verify.quickInfoIs('string', '', 'localVar', "local var");
goTo.marker('29');
verify.quickInfoIs('string', '', 'localVar', "local var");
goTo.marker('30');
verify.quickInfoIs('string', '', 'b', "parameter");
goTo.marker('31');
verify.quickInfoIs('(b: string) => string', '', 'lambdaVar', "local var");
goTo.marker('32');
verify.quickInfoIs('number', '', 'a', "parameter");
