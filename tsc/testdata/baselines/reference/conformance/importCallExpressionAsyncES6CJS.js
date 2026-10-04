//// [tests/cases/conformance/dynamicImport/importCallExpressionAsyncES6CJS.ts] ////

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
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.l = exports.cl2 = exports.obj = exports.cl1 = void 0;
exports.fn = fn;
function fn() {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // ONE
    });
}
class cl1 {
    m() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // TWO
        });
    }
}
exports.cl1 = cl1;
exports.obj = {
    m: () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // THREE
    })
};
class cl2 {
    constructor() {
        this.p = {
            m: () => __awaiter(this, void 0, void 0, function* () {
                const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // FOUR
            })
        };
    }
}
exports.cl2 = cl2;
const l = () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // FIVE
});
exports.l = l;
