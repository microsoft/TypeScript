// @strictNullChecks: true
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