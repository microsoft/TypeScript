//// [tests/cases/compiler/pinnedComments1.ts] ////

//// [pinnedComments1.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/* unpinned comment */
/*! pinned comment that need to be removed */
class C {
}

//// [pinnedComments1.js]
class C {
}
