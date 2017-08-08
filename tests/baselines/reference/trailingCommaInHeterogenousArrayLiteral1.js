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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var arrTest = (function () {
    function arrTest() {
    }
    arrTest.prototype.test = function (arg1) { };
    arrTest.prototype.callTest = function () {
        // these two should give the same error
        this.test([1, 2, "hi", 5,]);
        this.test([1, 2, "hi", 5]);
    };
    __names(arrTest.prototype, ["test", "callTest"]);
    return arrTest;
}());
