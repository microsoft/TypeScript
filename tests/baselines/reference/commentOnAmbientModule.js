//// [tests/cases/compiler/commentOnAmbientModule.ts] ////

//// [a.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare namespace C {
    function foo();
}

// Don't keep this comment.
declare namespace D {
    class bar { }
}

//// [b.ts]
///<reference path="a.ts"/>
declare namespace E {
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
