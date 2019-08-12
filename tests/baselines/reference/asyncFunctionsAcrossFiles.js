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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { a } from './a';
export const b = {
    f: () => __awaiter(void 0, void 0, void 0, function* () {
        yield a.f();
    })
};
//// [a.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { b } from './b';
export const a = {
    f: () => __awaiter(void 0, void 0, void 0, function* () {
        yield b.f();
    })
};
