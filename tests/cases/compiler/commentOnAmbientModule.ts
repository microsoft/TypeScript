//@filename: a.ts
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare module C {
    function foo();
}

// Keep this comment.
declare module D {
    class bar { }
}

//@filename: b.ts
///<reference path="a.ts"/>
declare module E {
    class foobar extends D.bar {
        foo();
    }
}
