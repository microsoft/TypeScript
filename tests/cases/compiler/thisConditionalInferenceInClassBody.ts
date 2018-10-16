type Wrapped<T> = { ___secret: T };
type Unwrap<T> = T extends Wrapped<infer U> ? U : T;

declare function set<T, K extends keyof T>(obj: T, key: K, value: Unwrap<T[K]>): Unwrap<T[K]>;

class Foo {
    prop: Wrapped<string>;

    method() {
        set(this, 'prop', 'hi'); // <-- type error
    }
}

set(new Foo(), 'prop', 'hi'); // <-- typechecks