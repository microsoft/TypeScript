//// [tests/cases/compiler/asyncSuperDefaultParameters.ts] ////

//// [asyncSuperDefaultParameters.ts]
class B {
    m() {
        return 1;
    }
}

class C extends B {
    f() {
        const g = async (b = super.m()) => b;
        return g();
    }

    async h(b = super.m()) {
        return b;
    }
}


//// [asyncSuperDefaultParameters.js]
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
class B {
    m() {
        return 1;
    }
}
class C extends B {
    f() {
        const _super = Object.create(null, {
            m: { get: () => super.m }
        });
        const g = (...args_1) => __awaiter(this, [...args_1], void 0, function* (b = _super.m.call(this)) { return b; });
        return g();
    }
    h() {
        const _super = Object.create(null, {
            m: { get: () => super.m }
        });
        return __awaiter(this, arguments, void 0, function* (b = _super.m.call(this)) {
            return b;
        });
    }
}
