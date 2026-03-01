// @target: es6
// simple example
export class Test<A, B> {
    constructor(public a: A, public b: B) { }

    test<C>(c: C): Test<B, C> {
        return new Test(this.b, c);
    }
}

// complicated one
interface Supervisor<out T> {
    zip<A>(right: Supervisor<A>): Supervisor<[T, A]>;
}

export class Zip<out T0, out T1> implements Supervisor<readonly [T0, T1]> {
    constructor(
        readonly left: Supervisor<T0>,
        readonly right: Supervisor<T1>,
    ) { }

    zip<A>(right: Supervisor<A>): Supervisor<[[T0, T1], A]> {
        return new Zip(this, right);
    }
}

// indirect
type Assign<T, U> = Omit<T, keyof U> & U;

class Base<T> {
    constructor(public t: T) { }
}

export class Foo<T> extends Base<T> {
    update(): Foo<Assign<T, { x: number }>> {
        const v: Assign<T, { x: number }> = Object.assign(this.t, { x: 1 });
        return new Foo(v);
    }
}