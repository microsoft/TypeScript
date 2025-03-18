//// [tests/cases/compiler/contextualTypingOfConditionalExpression.ts] ////

//// [contextualTypingOfConditionalExpression.ts]
var x: (a: number) => void = true ? (a) => a.toExponential() : (b) => b.toFixed();

class A {
    foo: number;
}
class B extends A {
    bar: number;
}
class C extends A {
    baz: number;
}

var x2: (a: A) => void = true ? (a) => a.foo : (b) => b.foo;


//// [contextualTypingOfConditionalExpression.js]
var x = true ? (a) => a.toExponential() : (b) => b.toFixed();
class A {
    foo;
}
class B extends A {
    bar;
}
class C extends A {
    baz;
}
var x2 = true ? (a) => a.foo : (b) => b.foo;
