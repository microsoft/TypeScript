//// [tests/cases/compiler/commentsArgumentsOfCallExpression1.ts] ////

//// [commentsArgumentsOfCallExpression1.ts]
function foo(/*c1*/ x: any) { }
foo(/*c2*/ 1);
foo(/*c3*/ function () { });
foo(
    /*c4*/
    () => { });
foo(
    /*c5*/
    /*c6*/
    () => { });
foo(/*c7*/
    () => { });
foo(
    /*c7*/
    /*c8*/() => { });

//// [commentsArgumentsOfCallExpression1.js]
function foo(/*c1*/ x) { }
foo(/*c2*/ 1);
foo(/*c3*/ function () { });
foo(
/*c4*/
function () { });
foo(
/*c5*/
/*c6*/
function () { });
foo(/*c7*/ function () { });
foo(
/*c7*/
/*c8*/ function () { });
