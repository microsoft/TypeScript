//// [tests/cases/compiler/doNotEmitPinnedCommentOnNotEmittedNodets.ts] ////

//// [doNotEmitPinnedCommentOnNotEmittedNodets.ts]
class C {
    /*! remove pinned comment anywhere else */
    public foo(x: string, y: any)
    public foo(x: string, y: number) { }
}

/*! remove pinned comment anywhere else */
declare var OData: any;

//// [doNotEmitPinnedCommentOnNotEmittedNodets.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) { };
    return C;
}());
