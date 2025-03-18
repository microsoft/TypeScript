//// [tests/cases/compiler/contextualTypingArrayOfLambdas.ts] ////

//// [contextualTypingArrayOfLambdas.ts]
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


//// [contextualTypingArrayOfLambdas.js]
class A {
    foo;
}
class B extends A {
    bar;
}
class C extends A {
    baz;
}
var xs = [(x) => { }, (x) => { }, (x) => { }];
