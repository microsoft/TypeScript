// @strict: true
// @target: esnext
// @noEmit: true

// Property lookups on instantiated class and interface references: declared
// and inherited members, members hidden by redeclarations, accessibility,
// `this` types, Object and Function members, and base types that change shape
// when instantiated.

interface Base<T> {
    value: T;
    method(): T;
    shared: string;
}

interface Derived<T> extends Base<T[]> {
    shared: "derived";
    own: T;
}

declare const d: Derived<number>;
const d1 = d.value;
const d2 = d.method();
const d3 = d.shared;
const d4 = d.own;
const d5 = d.toString();
d.missing;

class Box<T> {
    private secret!: T;
    protected guarded!: T;
    contents!: T;
    self(): this {
        return this;
    }
}

class NumberBox extends Box<number> {
    read() {
        return this.guarded;
    }
}

declare const box: Box<string>;
const box1 = box.contents;
const box2 = box.self().contents;
box.secret;
box.guarded;

declare const numberBox: NumberBox;
const numberBox1 = numberBox.self().read();

type Callable<T> = { (): void; kind: T } & { kind: "a" };
interface Fn<T extends string> extends Callable<T> {}

declare const neverFn: Fn<"b">;
neverFn.bind;
neverFn.kind;

declare const fn: Fn<"a">;
const fn1 = fn.bind;
const fn2 = fn.kind;

interface Newable<T> {
    new (): T;
}
interface NewableBox<T> extends Newable<Box<T>> {}

declare const newable: NewableBox<string>;
const newable1 = newable.prototype;
const newable2 = new newable().contents;

interface Wrap<T extends { a: string }> extends T {}

declare const wrap: Wrap<{ a: string; b: number }>;
const wrap1 = wrap.b;
wrap.c;

interface Tree<T> extends Array<Tree<T>> {
    value: T;
}

declare const tree: Tree<string>;
const tree1 = tree[0].value;
const tree2 = tree.map(child => child.value);
