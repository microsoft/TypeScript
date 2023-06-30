//// [tests/cases/conformance/expressions/optionalChaining/callChain/thisMethodCall.ts] ////

//// [thisMethodCall.ts]
class C {
    method?() {}
    other() {
        this.method?.();
    }
}

//// [thisMethodCall.js]
"use strict";
class C {
    method() { }
    other() {
        var _a;
        (_a = this.method) === null || _a === void 0 ? void 0 : _a.call(this);
    }
}
