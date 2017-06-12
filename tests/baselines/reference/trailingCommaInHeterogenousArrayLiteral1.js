//// [trailingCommaInHeterogenousArrayLiteral1.ts]
class arrTest {
    test(arg1: number[]) {    }
    callTest() {
        // these two should give the same error
        this.test([1, 2, "hi", 5, ]);
        this.test([1, 2, "hi", 5]); 
    }
}


//// [trailingCommaInHeterogenousArrayLiteral1.js]
var arrTest = (function () {
    function arrTest() {
    }
    var proto_1 = arrTest.prototype;
    proto_1.test = function (arg1) { };
    proto_1.callTest = function () {
        // these two should give the same error
        this.test([1, 2, "hi", 5,]);
        this.test([1, 2, "hi", 5]);
    };
    return arrTest;
}());
