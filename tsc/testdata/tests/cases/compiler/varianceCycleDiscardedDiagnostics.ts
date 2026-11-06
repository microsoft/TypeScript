// @strict: true
// @target: es2022
// @noEmit: true

// Measuring the variances of Bar resolves the type of Value, which picks an
// overload by relating Foo<T> to Foo<number> while the variances of Foo are
// still a guess. Diagnostics from that attempt must not outlive it.

interface A { a: string }
interface B { foo: string }
declare function pick(x: Foo<number>): A;
declare function pick(x: object): B;

class Bar<T> {
    x!: T;
    Value = pick(new Foo(this)).foo;
}

class Foo<T> {
    bar!: Bar<T>;
    constructor(bar: Bar<T>) {
        this.bar = bar;
    }
}

const v: number = new Bar<string>().Value;
