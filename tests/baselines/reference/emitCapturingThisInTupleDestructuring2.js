//// [tests/cases/compiler/emitCapturingThisInTupleDestructuring2.ts] ////

//// [emitCapturingThisInTupleDestructuring2.ts]
var array1: [number, number] = [1, 2];

class B {
    test: number;
    test1: any;
    test2: any;
    method() {
        () => [this.test, this.test1, this.test2] = array1; // even though there is a compiler error, we should still emit lexical capture for "this" 
    }
}

//// [emitCapturingThisInTupleDestructuring2.js]
var array1 = [1, 2];
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.method = function () {
        var _this = this;
        (function () { return _this.test = array1[0], _this.test1 = array1[1], _this.test2 = array1[2], array1; }); // even though there is a compiler error, we should still emit lexical capture for "this" 
    };
    return B;
}());
