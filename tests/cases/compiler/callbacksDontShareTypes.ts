interface Collection<T> {
    length: number;
    add(x: T): void;
    remove(x: T): boolean;
}
interface Combinators {
    map<T, U>(c: Collection<T>, f: (x: T) => U): Collection<U>;
    map<T>(c: Collection<T>, f: (x: T) => any): Collection<any>;
}

var _: Combinators;
var c2: Collection<number>;

var rf1 = (x: number) => { return x.toFixed() };
var r1a = _.map(c2, (x) => { return x.toFixed() });
var r1b = _.map(c2, rf1); // this line should not cause the following 2 to have errors 
var r5a = _.map<number, string>(c2, (x) => { return x.toFixed() });
var r5b = _.map<number, string>(c2, rf1);