//// [tests/cases/compiler/emitCapturingThisInTupleDestructuring1.ts] ////

//// [emitCapturingThisInTupleDestructuring1.ts]
declare function wrapper(x: any);
wrapper((array: [any]) => {
    [this.test, this.test1, this.test2] = array;  // even though there is a compiler error, we should still emit lexical capture for "this"
});

//// [emitCapturingThisInTupleDestructuring1.js]
var _this = this;
wrapper(function (array) {
    _this.test = array[0], _this.test1 = array[1], _this.test2 = array[2]; // even though there is a compiler error, we should still emit lexical capture for "this"
});
