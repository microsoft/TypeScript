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
}
class B extends A {
}
class C extends A {
}
var xs = [(x) => { }, (x) => { }, (x) => { }];
