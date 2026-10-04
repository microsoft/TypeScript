//// [tests/cases/compiler/commentOnAmbientfunction.ts] ////

//// [a.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare function foo();

// Don't keep this comment.
declare function bar();

//// [b.ts]
///<reference path="a.ts"/>
declare function foobar(a: typeof foo): typeof bar;

//// [a.js]
"use strict";
/*!=========
    Keep this pinned comment
   =========
*/
//// [b.js]
"use strict";
///<reference path="a.ts"/>
