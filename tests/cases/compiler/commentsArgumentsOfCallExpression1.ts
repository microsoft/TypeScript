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