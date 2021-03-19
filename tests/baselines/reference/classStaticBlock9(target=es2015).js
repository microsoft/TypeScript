//// [classStaticBlock9.ts]
class A {
    static bar = A.foo + 1
    static {
        A.foo + 2;
    }
    static foo = 1;
}


//// [classStaticBlock9.js]
var _A__;
class A {
}
A.bar = A.foo + 1;
_A__ = { value: (() => {
        A.foo + 2;
    })() };
A.foo = 1;
