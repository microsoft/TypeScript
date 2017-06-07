// @strictNullChecks: true
// @declaration: true

const test1 = {
    get a?() { // Object literal getters may not be marked optional
        return 2;
    }
}

class Foo {
    get a? () {
        return 1;
    }
    set a? (v: number) { } // Setters may not be marked optional
}

class Bar {
    get a() {
        return 1;
    }
    get b?(): string;  // Body of optional getter can be omitted
    get c?() {
        return 'foo';
    }
    get d?() {
        return 'bar';
    }
}

function test2(x: Bar) {
    x.a;
    x.b;
    x.c;
    x.d;
    let a1 = x.a;
    let b1 = x.b;
    let c1 = x.c.toString();
    let d1 = x.d && x.d.toString();
}

class Base {
    get f?(): number;
}

class Derived extends Base {
    get f(): number { return 1; }
}

class Person {
    firstName: string;
    lastName: string;

    get fullName?() {
        return this.firstName + ' ' + this.lastName;
    }
}

const person: Person = {
    firstName: 'foo',
    lastName: 'bar'
}
