//// [pinnedComments1.ts]

/* unpinned comment */
/*! pinned comment */
class C {
}

//// [pinnedComments1.js]
/*! pinned comment */
var C = (function () {
    function C() {
    }
    return C;
})();
