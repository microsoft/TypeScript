//// [tests/cases/conformance/dynamicImport/importCallExpressionAsyncES6UMD.ts] ////

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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.l = exports.cl2 = exports.obj = exports.cl1 = void 0;
    exports.fn = fn;
    function fn() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield __syncRequire ? Promise.resolve().then(() => __importStar(require('./test'))) : new Promise((resolve_1, reject_1) => { require(['./test'], resolve_1, reject_1); }).then(__importStar); // ONE
        });
    }
    class cl1 {
        m() {
            return __awaiter(this, void 0, void 0, function* () {
                const req = yield __syncRequire ? Promise.resolve().then(() => __importStar(require('./test'))) : new Promise((resolve_2, reject_2) => { require(['./test'], resolve_2, reject_2); }).then(__importStar); // TWO
            });
        }
    }
    exports.cl1 = cl1;
    exports.obj = {
        m: () => __awaiter(void 0, void 0, void 0, function* () {
            const req = yield __syncRequire ? Promise.resolve().then(() => __importStar(require('./test'))) : new Promise((resolve_3, reject_3) => { require(['./test'], resolve_3, reject_3); }).then(__importStar); // THREE
        })
    };
    class cl2 {
        constructor() {
            this.p = {
                m: () => __awaiter(this, void 0, void 0, function* () {
                    const req = yield __syncRequire ? Promise.resolve().then(() => __importStar(require('./test'))) : new Promise((resolve_4, reject_4) => { require(['./test'], resolve_4, reject_4); }).then(__importStar); // FOUR
                })
            };
        }
    }
    exports.cl2 = cl2;
    const l = () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield __syncRequire ? Promise.resolve().then(() => __importStar(require('./test'))) : new Promise((resolve_5, reject_5) => { require(['./test'], resolve_5, reject_5); }).then(__importStar); // FIVE
    });
    exports.l = l;
});
