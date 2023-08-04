//// [tests/cases/compiler/promiseChaining1.ts] ////

//// [promiseChaining1.ts]
// same example but with constraints on each type parameter
class Chain2<T extends { length: number }> {
    constructor(public value: T) { }
    then<S extends Function>(cb: (x: T) => S): Chain2<S> {
        var result = cb(this.value);
        // should get a fresh type parameter which each then call
        var z = this.then(x => result)/*S*/.then(x => "abc")/*Function*/.then(x => x.length)/*number*/; // Should error on "abc" because it is not a Function
        return new Chain2(result);
    }
}

//// [promiseChaining1.js]
// same example but with constraints on each type parameter
var Chain2 = /** @class */ (function () {
    function Chain2(value) {
        this.value = value;
    }
    Chain2.prototype.then = function (cb) {
        var result = cb(this.value);
        // should get a fresh type parameter which each then call
        var z = this.then(function (x) { return result; }) /*S*/.then(function (x) { return "abc"; }) /*Function*/.then(function (x) { return x.length; }) /*number*/; // Should error on "abc" because it is not a Function
        return new Chain2(result);
    };
    return Chain2;
}());
