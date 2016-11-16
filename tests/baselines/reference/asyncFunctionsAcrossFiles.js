//// [tests/cases/compiler/asyncFunctionsAcrossFiles.ts] ////

//// [a.ts]
import { b } from './b';
export const a = {
    f: async () => {
        await b.f();
    }
};
//// [b.ts]
import { a } from './a';
export const b = {
    f: async () => {
        await a.f();
    }
};

//// [b.js]
const __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {
    return new (P || (P = Promise))((resolve, reject) => {
        const fulfilled = value => { try { step(generator.next(value)); } catch (e) { reject(e); } }
        const rejected = value => { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        const step = result => { result.done ? resolve(result.value) : new P(resolve => { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
});
import { a } from './a';
export const b = {
    f: () => __awaiter(this, void 0, void 0, function* () {
        yield a.f();
    })
};
//// [a.js]
const __awaiter = (this && this.__awaiter) || ((thisArg, _arguments, P, generator) => {
    return new (P || (P = Promise))((resolve, reject) => {
        const fulfilled = value => { try { step(generator.next(value)); } catch (e) { reject(e); } }
        const rejected = value => { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        const step = result => { result.done ? resolve(result.value) : new P(resolve => { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
});
import { b } from './b';
export const a = {
    f: () => __awaiter(this, void 0, void 0, function* () {
        yield b.f();
    })
};
