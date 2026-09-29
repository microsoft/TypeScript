// @strict: true
// @target: esnext
// @noEmit: true

// Member lookups and shape queries on instantiated class and interface
// references, including base types whose shape depends on the instantiation.

interface Base<T> {
    value: T;
    shared: string;
}
interface Derived<T> extends Base<T[]> {
    shared: "derived";
}
declare const derived: Derived<number>;
const derived1 = derived.value;
const derived2 = derived.shared;
derived.missing;

class Box<T> {
    private secret!: T;
    contents!: T;
}
declare const box: Box<string>;
const box1 = box.contents;
box.secret;

// Tagged<"b"> reduces to never, Tagged<"a"> doesn't.
type Tagged<T> = { kind: T } & { kind: "a" };
declare const other: { other: number };

interface Weak<T extends string> extends Tagged<T> {
    opt?: number;
}
const weak1: Weak<"b"> = other;
const weak2: Weak<"a"> = other;

type Callable<T> = { (): void; kind: T } & { kind: "a" };
interface Fn<T extends string> extends Callable<T> {}
declare const neverFn: Fn<"b">;
neverFn.bind;
declare const fn: Fn<"a">;
const fn1 = fn.bind;

interface Dict<T extends string> extends Tagged<T> {
    [key: string]: unknown;
}
declare const dict: Dict<"b">;
const dict1: { [key: string]: number } = dict;

interface Wrap<T extends { a?: string }> extends T {}
const wrap1: Wrap<{ a?: string; b: number }> = other;

type Two<T> = { <U>(x: U, y: T): U } & { <U>(x: U, y: string): U };
interface Overloads<T> extends Two<T> {}
declare function pipe<A extends any[], B>(f: (...args: A) => B): (...args: A) => B;
declare const merged: Overloads<string>;
const piped1: number = pipe(merged);
declare const distinct: Overloads<number>;
const piped2: number = pipe(distinct);

interface Tree<T> extends Array<Tree<T>> {
    value: T;
}
declare const tree: Tree<string>;
const tree1 = tree.map(child => child.value);

interface CallableBox<T> {
    (): T;
}
declare const boxOrCallable: CallableBox<string> | Box<string>;
if (typeof boxOrCallable === "function") {
    boxOrCallable;
}
