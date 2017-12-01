//// [promiseChaining.ts]
class Chain<T> {
    constructor(public value: T) { }
    then<S>(cb: (x: T) => S): Chain<S> {
        var result = cb(this.value);
        // should get a fresh type parameter which each then call
        var z = this.then(x => result)/*S*/.then(x => "abc")/*string*/.then(x => x.length)/*number*/; // No error
        return new Chain(result);
    }
}



//// [promiseChaining.js]
var Chain = /** @class */ (function () {
    function Chain(value) {
        this.value = value;
    }
    Chain.prototype.then = function (cb) {
        var result = cb(this.value);
        // should get a fresh type parameter which each then call
        var z = this.then(function (x) { return result; }) /*S*/.then(function (x) { return "abc"; }) /*string*/.then(function (x) { return x.length; }) /*number*/; // No error
        return new Chain(result);
    };
    return Chain;
}());
