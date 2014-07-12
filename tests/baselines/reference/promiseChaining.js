//// [promiseChaining.js]
// This exhibits the bug that you see with Promise typings having generic signatures in a generic type
var Chain = (function () {
    function Chain(value) {
        this.value = value;
    }
    Chain.prototype.then = function (cb) {
        var result = cb(this.value);

        // BUG 858876
        // should get a fresh type parameter which each then call
        var z = this.then(function (x) {
            return result;
        }).then(function (x) {
            return "abc";
        }).then(function (x) {
            return x.length;
        });
        return new Chain(result);
    };
    return Chain;
})();

// same example but with constraints on each type parameter
var Chain2 = (function () {
    function Chain2(value) {
        this.value = value;
    }
    Chain2.prototype.then = function (cb) {
        var result = cb(this.value);

        // BUG 858876
        // should get a fresh type parameter which each then call
        var z = this.then(function (x) {
            return result;
        }).then(function (x) {
            return "abc";
        }).then(function (x) {
            return x.length;
        });
        return new Chain2(result);
    };
    return Chain2;
})();
