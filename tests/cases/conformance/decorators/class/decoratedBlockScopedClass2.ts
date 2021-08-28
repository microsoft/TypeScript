// @target: es5
// @experimentaldecorators: true
// @emitDecoratorMetadata: true
// @filename: a.ts

function decorator() {
    return (target: new (...args: any[]) => any) => {}
}

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
