//// [tests/cases/conformance/decorators/class/decoratedBlockScopedClass1.ts] ////

//// [a.ts]
function decorator() {
    return (target: new (...args: any[]) => any) => {}
}

@decorator()
class Foo {
    public static func(): Foo {
        return new Foo();
    }
}
Foo.func();


//// [a.js]
function decorator() {
    return (target) => { };
}
@decorator()
class Foo {
    static func() {
        return new Foo();
    }
}
Foo.func();
