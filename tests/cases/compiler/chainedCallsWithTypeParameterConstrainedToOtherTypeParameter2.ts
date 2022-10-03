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