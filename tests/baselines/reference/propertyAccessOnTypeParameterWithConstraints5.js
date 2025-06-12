//// [tests/cases/conformance/types/typeParameters/typeParameterLists/propertyAccessOnTypeParameterWithConstraints5.ts] ////

//// [propertyAccessOnTypeParameterWithConstraints5.ts]
class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string {
        return '';
    }
}

class C<U extends T, T extends A> {
    f() {
        var x: U;
        var a = x['foo'](); // should be string
        return a + x.foo() + x.notHere();
    }
}

var r = (new C<B, A>()).f();

interface I<U extends T, T extends A> {
    foo: U;
}
var i: I<B, A>;
var r2 = i.foo.notHere();
var r2b = i.foo['foo']();

var a: {
    <U extends T, T extends A>(): U;
}
// BUG 794164
var r3: string = a().notHere();
var r3b: string = a()['foo']();

var b = {
    foo: <U extends T, T extends A>(x: U): U => {
        var a = x['foo'](); // should be string
        return a + x.notHere();
    },
    // BUG 794164
    bar: b.foo(1).notHere()
}

var r4 = b.foo(new B()); // error after constraints above made illegal, doesn't matter

//// [propertyAccessOnTypeParameterWithConstraints5.js]
class A {
    foo() { return ''; }
}
class B extends A {
    bar() {
        return '';
    }
}
class C {
    f() {
        var x;
        var a = x['foo'](); // should be string
        return a + x.foo() + x.notHere();
    }
}
var r = (new C()).f();
var i;
var r2 = i.foo.notHere();
var r2b = i.foo['foo']();
var a;
// BUG 794164
var r3 = a().notHere();
var r3b = a()['foo']();
var b = {
    foo: (x) => {
        var a = x['foo'](); // should be string
        return a + x.notHere();
    },
    // BUG 794164
    bar: b.foo(1).notHere()
};
var r4 = b.foo(new B()); // error after constraints above made illegal, doesn't matter
