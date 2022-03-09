// @strictNullChecks: true
// @lib: esnext,dom

declare class A {
    static from(): string;
}

declare class B {
    static from(): string;
}

function test(required1: () => boolean, required2: () => boolean, b: boolean, optional?: () => boolean) {
    // error
    required1 && console.log('required');

    // error
    1 && required1 && console.log('required');

    // ok
    required1 && required1();

    // ok
    required1 && 1 && required1();

    // ok
    optional && console.log('optional');

    // ok
    1 && optional && console.log('optional');

    // ok
    !!required1 && console.log('not required');

    // ok
    required1() && console.log('required call');

    // ok
    required1 && required2 && required1() && required2();

    // ok
    [].forEach((f: () => void) => f && f.apply(parent, []));

    // error
    required1 && required2 && required1() && console.log('foo');

    // error
    if (required1 && b) {
    }

    // error
    if (((required1 && b))) {
    }

    // ok
    if (required1 && b) {
        required1();
    }

    // ok
    if (((required1 && b))) {
        required1();
    }
}

function checksConsole() {
    // error
    typeof window !== 'undefined' && window.console &&
        ((window.console as any).firebug || (window.console.error && window.console.table));
}

function checksPropertyAccess() {
    const x = {
        foo: {
            bar() { return true; }
        }
    }

    // error
    x.foo.bar && console.log('x.foo.bar');

    // error
    1 && x.foo.bar && console.log('x.foo.bar');

    // ok
    x.foo.bar && x.foo.bar();

    // ok
    x.foo.bar && 1 && x.foo.bar();

    // ok
    const y = A.from && (A.from as Function) !== B.from ? true : false;
    y;

    const x1 = {
        a: { b: { c: () => {} } }
    }
    const x2 = {
        a: { b: { c: () => {} } }
    }

    // error
    x1.a.b.c && x2.a.b.c();
}

class Foo {
    optional?: () => boolean;
    required() {
        return true;
    }
    test() {
        // error
        this.required && console.log('required');

        // error
        1 && this.required && console.log('required');

        // ok
        this.required && this.required();

        // ok
        this.required && 1 && this.required();

        // ok
        1 && this.optional && console.log('optional');
    }
}
