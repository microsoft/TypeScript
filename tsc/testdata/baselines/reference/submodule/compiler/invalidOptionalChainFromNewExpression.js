//// [tests/cases/compiler/invalidOptionalChainFromNewExpression.ts] ////

//// [invalidOptionalChainFromNewExpression.ts]
class A {
    b() {}
}

new A?.b()   // error
new A()?.b() // ok


//// [invalidOptionalChainFromNewExpression.js]
class A {
    b() { }
}
(new A)?.b(); // error
new A()?.b(); // ok
