//// [tests/cases/conformance/expressions/optionalChaining/callChain/callChainWithSuper.ts] ////

//// [callChainWithSuper.ts]
// GH#34952
class Base { method?() {} }
class Derived extends Base {
    method1() { return super.method?.(); }
    method2() { return super["method"]?.(); }
}

//// [callChainWithSuper.js]
// GH#34952
class Base {
    method() { }
}
class Derived extends Base {
    method1() { return super.method?.(); }
    method2() { return super["method"]?.(); }
}
