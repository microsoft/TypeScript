//// [tests/cases/compiler/commentOnAmbientModule.ts] ////

//// [a.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare module C {
    function foo();
}

// Don't keep this comment.
declare module D {
    class bar { }
}

//// [b.ts]
///<reference path="a.ts"/>
declare module E {
    class foobar extends D.bar {
        foo();
    }
}

//// [a.js]
/*!=========
    Keep this pinned comment
   =========
*/
//// [b.js]
///<reference path="a.ts"/>
