interface Collection<T, U> {
    length: number;
    add(x: T, y: U): void;
    remove(x: T, y: U): boolean;
}

interface Combinators {
    map<T, U>(c: Collection<T, U>, f: (x: T, y: U) => any): Collection<any, any>;
    map<T, U, V>(c: Collection<T, U>, f: (x: T, y: U) => V): Collection<T, V>;
}

var _: Combinators;
var c2: Collection<number, string>;
var rf1 = (x: number, y: string) => { return x.toFixed() };
var r5a = _.map<number, string, Date>(c2, (x, y) => { return x.toFixed() });
var r5b = _.map<number, string, Date>(c2, rf1);