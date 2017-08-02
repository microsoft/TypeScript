//// [test.ts]
export async function fn() {
    const req = await import('./test') // ONE
}

export class cl1 {
    public async m() {
        const req = await import('./test') // TWO
    }
}

export const obj = {
    m: async () => {
        const req = await import('./test') // THREE
    }
}

export class cl2 {
    public p = {
        m: async () => {
            const req = await import('./test') // FOUR
        }
    }
}

export const l = async () => {
    const req = await import('./test') // FIVE
}


//// [test.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function fn() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield new Promise(function (resolve_1, reject_1) { require(['./test'], resolve_1, reject_1); }); // ONE
        });
    }
    exports.fn = fn;
    class cl1 {
        m() {
            return __awaiter(this, void 0, void 0, function* () {
                const req = yield new Promise(function (resolve_2, reject_2) { require(['./test'], resolve_2, reject_2); }); // TWO
            });
        }
    }
    exports.cl1 = cl1;
    exports.obj = {
        m: () => __awaiter(this, void 0, void 0, function* () {
            const req = yield new Promise(function (resolve_3, reject_3) { require(['./test'], resolve_3, reject_3); }); // THREE
        })
    };
    class cl2 {
        constructor() {
            this.p = {
                m: () => __awaiter(this, void 0, void 0, function* () {
                    const req = yield new Promise(function (resolve_4, reject_4) { require(['./test'], resolve_4, reject_4); }); // FOUR
                })
            };
        }
    }
    exports.cl2 = cl2;
    exports.l = () => __awaiter(this, void 0, void 0, function* () {
        const req = yield new Promise(function (resolve_5, reject_5) { require(['./test'], resolve_5, reject_5); }); // FIVE
    });
});
