//// [chainedCallsWithTypeParameterConstrainedToOtherTypeParameter2.ts]
class Chain<T> {
    constructor(public value: T) { }
    then<S extends T>(cb: (x: T) => S): Chain<S> {
        var t: T;
        var s: S;
        // Ok to go down the chain, but error to climb up the chain
        (new Chain(t)).then(tt => s).then(ss => t);

        // But error to try to climb up the chain
        (new Chain(s)).then(ss => t);

        // Staying at T or S should be fine
        (new Chain(t)).then(tt => t).then(tt => t).then(tt => t);
        (new Chain(s)).then(ss => s).then(ss => s).then(ss => s);

        return null;
    }
}

// Similar to above, but T is now constrained. Verify that the constraint is maintained across invocations
interface I {
    x: number;
}
class Chain2<T extends I> {
    constructor(public value: T) { }
    then<S extends T>(cb: (x: T) => S): Chain2<S> {
        var i: I;
        var t: T;
        var s: S;
        // Ok to go down the chain, check the constraint at the end.
        // Should get an error that we are assigning a string to a number
        (new Chain2(i)).then(ii => t).then(tt => s).value.x = "";

        // Staying at T or S should keep the constraint.
        // Get an error when we assign a string to a number in both cases
        (new Chain2(i)).then(ii => t).then(tt => t).then(tt => t).then(tt => t).value.x = "";
        (new Chain2(i)).then(ii => s).then(ss => s).then(ss => s).then(ss => s).value.x = "";

        return null;
    }
}

//// [chainedCallsWithTypeParameterConstrainedToOtherTypeParameter2.js]
var Chain = /** @class */ (function () {
    function Chain(value) {
        this.value = value;
    }
    Chain.prototype.then = function (cb) {
        var t;
        var s;
        // Ok to go down the chain, but error to climb up the chain
        (new Chain(t)).then(function (tt) { return s; }).then(function (ss) { return t; });
        // But error to try to climb up the chain
        (new Chain(s)).then(function (ss) { return t; });
        // Staying at T or S should be fine
        (new Chain(t)).then(function (tt) { return t; }).then(function (tt) { return t; }).then(function (tt) { return t; });
        (new Chain(s)).then(function (ss) { return s; }).then(function (ss) { return s; }).then(function (ss) { return s; });
        return null;
    };
    return Chain;
}());
var Chain2 = /** @class */ (function () {
    function Chain2(value) {
        this.value = value;
    }
    Chain2.prototype.then = function (cb) {
        var i;
        var t;
        var s;
        // Ok to go down the chain, check the constraint at the end.
        // Should get an error that we are assigning a string to a number
        (new Chain2(i)).then(function (ii) { return t; }).then(function (tt) { return s; }).value.x = "";
        // Staying at T or S should keep the constraint.
        // Get an error when we assign a string to a number in both cases
        (new Chain2(i)).then(function (ii) { return t; }).then(function (tt) { return t; }).then(function (tt) { return t; }).then(function (tt) { return t; }).value.x = "";
        (new Chain2(i)).then(function (ii) { return s; }).then(function (ss) { return s; }).then(function (ss) { return s; }).then(function (ss) { return s; }).value.x = "";
        return null;
    };
    return Chain2;
}());
