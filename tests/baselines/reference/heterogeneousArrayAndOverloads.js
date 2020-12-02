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
var arrTest = /** @class */ (function () {
    function arrTest() {
    }
    var arrTest_prototype = arrTest.prototype;
    arrTest_prototype.test = function (arg1) { };
    arrTest_prototype.callTest = function () {
        this.test([1, 2, 3, 5]);
        this.test(["hi"]);
        this.test([]);
        this.test([1, 2, "hi", 5]); // Error
    };
    return arrTest;
}());
