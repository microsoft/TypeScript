//// [getterMissingReturnError.ts]
class test {
    public get p2(){

    }
}


//// [getterMissingReturnError.js]
var test = /** @class */ (function () {
    function test() {
    }
    Object.defineProperty(test.prototype, "p2", {
        get: function () {
        },
        enumerable: false,
        configurable: true
    });
    return test;
}());
