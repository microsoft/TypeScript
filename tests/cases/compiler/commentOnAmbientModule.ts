//@filename: a.ts
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

//@filename: b.ts
///<reference path="a.ts"/>
declare namespace E {
    class foobar extends D.bar {
        foo();
    }
}