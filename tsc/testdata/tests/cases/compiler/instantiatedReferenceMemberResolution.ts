// @strict: true
// @target: esnext
// @declaration: true

interface Base<T> {
    value: T;
    shared: string;
}
interface Derived<T> extends Base<T[]> {
    shared: "derived";
    own: T;
}
declare const derived: Derived<number>;
export const value = derived.value;
export const shared = derived.shared;
export const properties = { ...derived };
export const again = derived.value;
derived.missing;

class Box<T> {
    private secret!: T;
    protected hidden!: T;
    contents!: T;
    get readonlyContents(): T { return this.contents; }
    set writeonlyContents(value: T) {}
    method<U>(value: U): [T, U] { return [this.contents, value]; }
}
declare const box: Box<string>;
export const contents = box.contents;
export const method = box.method(1);
export const boxProperties = { ...box };
box.secret;

interface Weak<T> {
    value?: T;
}
declare const unrelated: { other: number };
const weak: Weak<string> = unrelated;
type Tagged<T> = { kind: T } & { kind: "a" };
interface ConditionalBase<T extends string> extends Tagged<T> { optional?: T }
const reduced: ConditionalBase<"b"> = unrelated;
const unreduced: ConditionalBase<"a"> = unrelated;

type Callable<T> = { (): T; kind: T } & { kind: "a" };
interface Fn<T extends string> extends Callable<T> {}
declare const neverFn: Fn<"b">;
neverFn.bind;
declare const fn: Fn<"a">;
export const bound = fn.bind;
interface Dict<T> { [key: string]: T }
declare const dict: Dict<string>;
export const indexed = dict["property"];

interface Wrap<T extends { a?: string }> extends T {}
const wrapped: Wrap<{ a?: string; b: number }> = unrelated;

interface Tree<T> extends Array<Tree<T>> { value: T }
declare const tree: Tree<string>;
export const children = tree.map(child => child.value);
interface Self<T> { next: this; value: T }
declare const self: Self<number>;
export const next = self.next.next.value;
interface Defaults<T = Defaults> { value: T }
declare const defaults: Defaults;
export const defaultValue = defaults.value;

interface First<T> { shared: T }
interface Second<T> { shared: T; second: T }
interface Multiple<T> extends First<T>, Second<T> { own: T }
declare const multiple: Multiple<number>;
export const multipleValue = multiple.shared;
export const multipleProperties = { ...multiple };

interface ReducedDict<T extends string> extends Tagged<T> {
    [key: string]: unknown;
}
declare const reducedDict: ReducedDict<"b">;
const numberDict: { [key: string]: number } = reducedDict;

type Two<T> = { <U>(x: U, y: T): U } & { <U>(x: U, y: string): U };
interface Overloads<T> extends Two<T> {}
declare function pipe<A extends any[], B>(f: (...args: A) => B): (...args: A) => B;
declare const merged: Overloads<string>;
const piped1: number = pipe(merged);
declare const distinct: Overloads<number>;
const piped2: number = pipe(distinct);

interface CallableBox<T> { (): T }
declare const boxOrCallable: CallableBox<string> | Box<string>;
if (typeof boxOrCallable === "function") {
    boxOrCallable;
}
