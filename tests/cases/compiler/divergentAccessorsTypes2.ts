// @strict: true
// @target: esnext

class Test1<T> {
    get foo(): T { return null as any }
    set foo(s: T | undefined ) {
    }
}

const s = new Test1<string>();
s.foo = undefined;
s.foo = "hello";
s.foo = 42;
