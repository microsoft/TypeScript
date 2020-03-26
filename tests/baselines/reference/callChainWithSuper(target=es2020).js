//// [callChainWithSuper.ts]
// GH#34952
class Base { method?() {} }
class Derived extends Base {
    method1() { return super.method?.(); }
    method2() { return super["method"]?.(); }
}

//// [callChainWithSuper.js]
"use strict";
// GH#34952
class Base {
    method() { }
}
class Derived extends Base {
    method1() { return super.method?.(); }
    method2() { return super["method"]?.(); }
}
