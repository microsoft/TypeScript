interface Collection<T, U> {
    length: number;
    add(x: T, y: U): void;
    remove(x: T, y: U): boolean;
}
interface Combinators {
    map<T, U, V>(c: Collection<T,U>, f: (x: T, y: U) => V): Collection<T, V>;
    map<T, U>(c: Collection<T,U>, f: (x: T, y: U) => any): Collection<any, any>;
}
var c2: Collection<number, string>;
var _: Combinators;
var r1a = _.map(c2, (x) => { return x.toFixed() }); 
var rf1 = (x: number) => { return x.toFixed() };
var r1b = _.map(c2, rf1); 

