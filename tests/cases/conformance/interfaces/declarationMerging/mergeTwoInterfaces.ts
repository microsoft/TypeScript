// two interfaces with the same root module should merge

// basic case
interface A {
    foo: string;
}

interface A {
    bar: number;
}

var a: A;
var r1 = a.foo
var r2 = a.bar;

// basic generic case
interface B<T> {
    baz: string;
    foo: T;
}

interface B<T> {
    bar: T;
}

var b: B<string>;
var r3 = b.foo
var r4 = b.bar;

// basic non-generic and generic case inside a module
module M {
    interface A {
        foo: string;
    }

    interface A {
        bar: number;
    }

    var a: A;
    var r1 = a.foo;
    // BUG 856491
    var r2 = a.bar; // any, should be number

    interface B<T> {
        foo: T;
    }

    interface B<T> {
        bar: T;
    }

    var b: B<string>;
    var r3 = b.foo
    // BUG 856491
    var r4 = b.bar; // any, should be string
}