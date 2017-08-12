//// [getterMissingReturnError.ts]
class test {
    public get p2(){

    }
}


//// [getterMissingReturnError.js]
var test = (function () {
    function test() {
    }
    var proto_1 = test.prototype;
    Object.defineProperty(proto_1, "p2", {
        get: function () {
        },
        enumerable: true,
        configurable: true
    });
    return test;
}());
