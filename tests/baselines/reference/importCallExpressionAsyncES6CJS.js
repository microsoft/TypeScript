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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
function fn() {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // ONE
    });
}
exports.fn = fn;
class cl1 {
    m() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // TWO
        });
    }
}
exports.cl1 = cl1;
exports.obj = {
    m: () => __awaiter(this, void 0, void 0, function* () {
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
exports.l = () => __awaiter(this, void 0, void 0, function* () {
    const req = yield Promise.resolve().then(() => __importStar(require('./test'))); // FIVE
});
