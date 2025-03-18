//// [tests/cases/compiler/strictNullNotNullIndexTypeNoLib.ts] ////

//// [strictNullNotNullIndexTypeNoLib.ts]
type Readonly<T> = {readonly [K in keyof T]: T[K]}
interface A {
    params?: { name: string; };
}

class Test<T extends A> {
    attrs: Readonly<T>;

    m() {
        this.attrs.params!.name;
    }
}

interface Foo {
    foo?: number;
}

class FooClass<P extends Foo = Foo> {
    properties: Readonly<P>;

    foo(): number {
        const { foo = 42 } = this.properties;
        return foo;
    }
}

class Test2<T extends A> {
    attrs: Readonly<T>;

    m() {
        return this.attrs.params!; // Return type should maintain relationship with `T` after being not-null-asserted, ideally
    }
}

//// [strictNullNotNullIndexTypeNoLib.js]
class Test {
    attrs;
    m() {
        this.attrs.params.name;
    }
}
class FooClass {
    properties;
    foo() {
        const { foo = 42 } = this.properties;
        return foo;
    }
}
class Test2 {
    attrs;
    m() {
        return this.attrs.params;
    }
}
