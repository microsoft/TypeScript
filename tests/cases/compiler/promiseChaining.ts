<<<<<<< HEAD
=======
// This exhibits the bug that you see with Promise typings having generic signatures in a generic type

// BUG 858876: should get a fresh type parameter which each then call

>>>>>>> d99cb83... Clean up 'blocked' tests
class Chain<T> {
    constructor(public value: T) { }
    then<S>(cb: (x: T) => S): Chain<S> {
        var result = cb(this.value);
<<<<<<< HEAD
        // should get a fresh type parameter which each then call
        var z = this.then(x => result)/*S*/.then(x => "abc")/*string*/.then(x => x.length)/*number*/; // No error
        return new Chain(result);
    }
}
=======
        var z = this.then(x => result).then(x => "abc").then(x => x.length); 
        return new Chain(result);
    }
}

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
>>>>>>> d99cb83... Clean up 'blocked' tests
