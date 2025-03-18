//// [tests/cases/conformance/decorators/class/decoratedBlockScopedClass3.ts] ////

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

try {
    @decorator()
    class Foo {
        public static func(): Foo {
            return new Foo();
        }
    }
    Foo.func();
}
catch (e) {}


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
try {
    @decorator()
    class Foo {
        static func() {
            return new Foo();
        }
    }
    Foo.func();
}
catch (e) { }
