//// [heterogeneousArrayAndOverloads.ts]
class arrTest {
    test(arg1: number[]);
    test(arg1: string[]);
    test(arg1: any[]) { }
    callTest() {
        this.test([1, 2, 3, 5]);
        this.test(["hi"]);
        this.test([]);
        this.test([1, 2, "hi", 5]); // Error
    }
}

//// [heterogeneousArrayAndOverloads.js]
var arrTest = (function () {
    function arrTest() {
    }
    var proto_1 = arrTest.prototype;
    proto_1.test = function (arg1) { };
    proto_1.callTest = function () {
        this.test([1, 2, 3, 5]);
        this.test(["hi"]);
        this.test([]);
        this.test([1, 2, "hi", 5]); // Error
    };
    return arrTest;
}());
