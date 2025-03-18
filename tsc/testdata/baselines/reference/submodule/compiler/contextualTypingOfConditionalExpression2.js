//// [tests/cases/compiler/contextualTypingOfConditionalExpression2.ts] ////

//// [contextualTypingOfConditionalExpression2.ts]
class A {
    foo: number;
}
class B extends A {
    bar: number;
}
class C extends A {
    baz: number;
}

var x2: (a: A) => void = true ? (a: C) => a.foo : (b: number) => { };


//// [contextualTypingOfConditionalExpression2.js]
class A {
    foo;
}
class B extends A {
    bar;
}
class C extends A {
    baz;
}
var x2 = true ? (a) => a.foo : (b) => { };
