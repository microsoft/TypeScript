//// [tests/cases/conformance/expressions/optionalChaining/callChain/thisMethodCall.ts] ////

//// [thisMethodCall.ts]
class C {
    method?() {}
    other() {
        this.method?.();
    }
}

//// [thisMethodCall.js]
class C {
    method() { }
    other() {
        this.method?.();
    }
}
