//// [tests/cases/compiler/emptyArgumentsListComment.ts] ////

//// [emptyArgumentsListComment.ts]
declare var a;

a(/*1*/);
a(
    /*first*/
    // foo
    /*middle*/
    // bar
    /*last*/
);


//// [emptyArgumentsListComment.js]
"use strict";
a( /*1*/ /*1*/);
a();
