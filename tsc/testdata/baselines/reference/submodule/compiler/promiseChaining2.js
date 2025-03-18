//// [tests/cases/compiler/promiseChaining2.ts] ////

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
class Chain2 {
    value;
    constructor(value) {
        this.value = value;
    }
    then(cb) {
        var result = cb(this.value);
        var z = this.then(x => result).then(x => "abc").then(x => x.length);
        return new Chain2(result);
    }
}
