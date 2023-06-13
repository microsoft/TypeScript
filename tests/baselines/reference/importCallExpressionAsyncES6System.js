//// [tests/cases/conformance/dynamicImport/importCallExpressionAsyncES6System.ts] ////

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
System.register([], function (exports_1, context_1) {
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
    var cl1, obj, cl2, l;
    var __moduleName = context_1 && context_1.id;
    function fn() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield context_1.import('./test'); // ONE
        });
    }
    exports_1("fn", fn);
    return {
        setters: [],
        execute: function () {
            cl1 = class cl1 {
                m() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const req = yield context_1.import('./test'); // TWO
                    });
                }
            };
            exports_1("cl1", cl1);
            exports_1("obj", obj = {
                m: () => __awaiter(void 0, void 0, void 0, function* () {
                    const req = yield context_1.import('./test'); // THREE
                })
            });
            cl2 = class cl2 {
                constructor() {
                    this.p = {
                        m: () => __awaiter(this, void 0, void 0, function* () {
                            const req = yield context_1.import('./test'); // FOUR
                        })
                    };
                }
            };
            exports_1("cl2", cl2);
            exports_1("l", l = () => __awaiter(void 0, void 0, void 0, function* () {
                const req = yield context_1.import('./test'); // FIVE
            }));
        }
    };
});
