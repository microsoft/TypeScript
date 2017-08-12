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
    var proto_1 = C.prototype;
    proto_1.foo = function (x, y) { };
    return C;
}());
