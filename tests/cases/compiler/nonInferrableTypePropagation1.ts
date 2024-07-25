// @strict: true

type Op<I, O> = (thing: Thing<I>) => Thing<O>;
type Thing<T> = {
    value: T;
    pipe<A, B>(
        opA: Op<T, A>,
        opB: Op<A, B>,
    ): Thing<B>;
};
type Box<V> = { data: V };

declare const thing: Thing<number>;

declare function map<T, R>(project: (value: T) => R): Op<T, R>;
declare function tap<T>(next: (value: T) => void): Op<T, T>;
declare function box<V>(data: V): Box<V>;
declare function createAndUnbox<V>(factory: () => Thing<V | Box<V>>): Thing<V>;
declare function log(value: any): void;

const result1 = createAndUnbox(() => thing.pipe(
    map((data) => box(data)),
    tap((v) => log(v)),
));

const result2 = createAndUnbox(() => thing.pipe(
    tap((v) => log(v)),
    map((data) => box(data)),
));
