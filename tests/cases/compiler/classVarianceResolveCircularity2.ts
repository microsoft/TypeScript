// @strict: true

// Issue #52813

export {};

class Bar<T> {
    num!: number;
    Value = callme(new Foo(this)).bar.num;
    Field: number = callme(new Foo(this)).bar.num;
}
declare function callme(x: Foo<any>): Foo<any>;
declare function callme(x: object): string;

class Foo<T> {
    bar!: Bar<T>;
    constructor(bar: Bar<T>) {
        this.bar = bar;
    }
}