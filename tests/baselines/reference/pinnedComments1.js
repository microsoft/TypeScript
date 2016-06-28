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
/*!=========
    Keep this pinned comment
   =========
*/
var C = (function () {
    function C() {
    }
    return C;
}());
