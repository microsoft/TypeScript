// @strict: true
// @target es6

class A {
    #foo: number;
}

class B extends A {
    #foo: string;    // OK: private names are unique to each class
}

const b: A = new B() // OK
