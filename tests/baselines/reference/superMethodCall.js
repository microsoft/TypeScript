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
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Base {
    method() { }
}
class Derived extends Base {
    method() {
        var _a;
        return (_a = super.method) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    asyncMethod() {
        const _super = Object.create(null, {
            method: { get: () => super.method }
        });
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = _super.method) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
