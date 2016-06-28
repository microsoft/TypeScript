//@filename: a.ts
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare function foo();

// Don't keep this comment.
declare function bar();

//@filename: b.ts
///<reference path="a.ts"/>
declare function foobar(a: typeof foo): typeof bar;