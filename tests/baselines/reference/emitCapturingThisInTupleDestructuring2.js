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
var array1 = [1, 2];
var B = (function () {
    function B() {
    }
    B.prototype.method = function () {
        var _this = this;
        (function () { return _this.test = array1[0], _this.test1 = array1[1], _this.test2 = array1[2], array1; }); // even though there is a compiler error, we should still emit lexical capture for "this" 
    };
    __names(B.prototype, ["method"]);
    return B;
}());
