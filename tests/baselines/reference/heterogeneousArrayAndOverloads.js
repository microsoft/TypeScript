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
    arrTest.prototype.test = function (arg1) { };
    arrTest.prototype.callTest = function () {
        this.test([1, 2, 3, 5]);
        this.test(["hi"]);
        this.test([]);
        this.test([1, 2, "hi", 5]); // Error
    };
    return arrTest;
}());
