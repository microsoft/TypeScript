// checking whether other types are subtypes of type parameters with constraints

class Foo { foo: number; }
function f<T extends Foo, U extends Foo, V>(t: T, u: U, v: V) {
    // ok
    var r = true ? t : u;
    var r = true ? u : t;

    // ok
    var r2 = true ? t : v;
    var r2 = true ? v : t;

    // ok
    var r3 = true ? v : u;
    var r3 = true ? u : v;

    // ok
    var r4 = true ? t : new Foo();
    var r4 = true ? new Foo() : t;

    // ok
    var r5 = true ? u : new Foo();
    var r5 = true ? new Foo() : u;

    // ok
    var r6 = true ? v : new Foo();
    var r6 = true ? new Foo() : v;

}

class B1<T> {
    foo: T;
}

class D1<T extends Foo, U extends Foo, V> extends B1<Foo> {
    [x: string]: Foo;
    foo: T; // ok
}

class D2<T extends Foo, U extends Foo, V> extends B1<Foo> {
    [x: string]: Foo;
    foo: U; // ok
}

class D3<T extends Foo, U extends Foo, V> extends B1<Foo> {
    [x: string]: Foo;
    foo: V; // error
}

class D4<T extends Foo, U extends Foo, V> extends B1<T> {
    [x: string]: T;
    foo: T; // ok
}

class D5<T extends Foo, U extends Foo, V> extends B1<T> {
    [x: string]: T;
    foo: U; // error
}

class D6<T extends Foo, U extends Foo, V> extends B1<T> {
    [x: string]: T;
    foo: V; // error
}

class D7<T extends Foo, U extends Foo, V> extends B1<U> {
    [x: string]: U;
    foo: T; // error
}

class D8<T extends Foo, U extends Foo, V> extends B1<U> {
    [x: string]: U;
    foo: U; // ok
}

class D9<T extends Foo, U extends Foo, V> extends B1<U> {
    [x: string]: U;
    foo: V; // error
}