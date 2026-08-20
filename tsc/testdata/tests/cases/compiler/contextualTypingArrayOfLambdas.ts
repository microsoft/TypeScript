// @target: es2015
// @strict: false
class A {
    foo: string;
}

class B extends A {
    bar: string;
}

class C extends A {
    baz: string;
}

var xs = [(x: A) => { }, (x: B) => { }, (x: C) => { }];
