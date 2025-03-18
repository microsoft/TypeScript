//// [tests/cases/conformance/expressions/optionalChaining/callChain/superMethodCall.ts] ////

//// [superMethodCall.ts]
class Base {
    method?() { }
}

class Derived extends Base {
    method() {
        return super.method?.();
    }

    async asyncMethod() {
        return super.method?.();
    }
}

//// [superMethodCall.js]
class Base {
    method() { }
}
class Derived extends Base {
    method() {
        return super.method?.();
    }
    async asyncMethod() {
        return super.method?.();
    }
}
