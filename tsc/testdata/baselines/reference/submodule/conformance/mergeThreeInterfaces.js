//// [tests/cases/conformance/interfaces/declarationMerging/mergeThreeInterfaces.ts] ////

//// [mergeThreeInterfaces.ts]
// interfaces with the same root module should merge

// basic case
interface A {
    foo: string;
}

interface A {
    bar: number;
}

interface A {
    baz: boolean;
}

var a: A;
var r1 = a.foo
var r2 = a.bar;
var r3 = a.baz;

// basic generic case
interface B<T> {
    foo: T;
}

interface B<T> {
    bar: T;
}

interface B<T> {
    baz: T;
}

var b: B<string>;
var r4 = b.foo
var r5 = b.bar;
var r6 = b.baz;

// basic non-generic and generic case inside a module
module M {
    interface A {
        foo: string;
    }

    interface A {
        bar: number;
    }

    interface A {
        baz: boolean;
    }

    var a: A;
    var r1 = a.foo;
    // BUG 856491
    var r2 = a.bar; // any, should be number
    // BUG 856491
    var r3 = a.baz; // any, should be boolean

    interface B<T> {
        foo: T;
    }

    interface B<T> {
        bar: T;
    }

    interface B<T> {
        baz: T;
    }

    var b: B<string>;
    var r4 = b.foo
    // BUG 856491
    var r5 = b.bar; // any, should be number
    // BUG 856491
    var r6 = b.baz; // any, should be boolean
}

//// [mergeThreeInterfaces.js]
// interfaces with the same root module should merge
var a;
var r1 = a.foo;
var r2 = a.bar;
var r3 = a.baz;
var b;
var r4 = b.foo;
var r5 = b.bar;
var r6 = b.baz;
// basic non-generic and generic case inside a module
var M;
(function (M) {
    var a;
    var r1 = a.foo;
    // BUG 856491
    var r2 = a.bar; // any, should be number
    // BUG 856491
    var r3 = a.baz; // any, should be boolean
    var b;
    var r4 = b.foo;
    // BUG 856491
    var r5 = b.bar; // any, should be number
    // BUG 856491
    var r6 = b.baz; // any, should be boolean
})(M || (M = {}));
