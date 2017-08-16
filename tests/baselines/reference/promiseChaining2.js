//// [promiseChaining2.ts]
// same example but with constraints on each type parameter
class Chain2<T extends { length: number }> {
    constructor(public value: T) { }
    then<S extends Function>(cb: (x: T) => S): Chain2<S> {
        var result = cb(this.value);
        // should get a fresh type parameter which each then call
        var z = this.then(x => result).then(x => "abc").then(x => x.length);
        return new Chain2(result);
    }
}

//// [promiseChaining2.js]
// same example but with constraints on each type parameter
var Chain2 = /** @class */ (function () {
    function Chain2(value) {
        this.value = value;
    }
    Chain2.prototype.then = function (cb) {
        var result = cb(this.value);
        // should get a fresh type parameter which each then call
        var z = this.then(function (x) { return result; }).then(function (x) { return "abc"; }).then(function (x) { return x.length; });
        return new Chain2(result);
    };
    return Chain2;
}());
