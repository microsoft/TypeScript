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
        var _a;
        return (_a = super.method) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    async asyncMethod() {
        var _a;
        return (_a = super.method) === null || _a === void 0 ? void 0 : _a.call(this);
    }
}
