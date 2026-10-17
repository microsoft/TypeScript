//// [tests/cases/compiler/parenthesizedAsyncArrowFunction.ts] ////

//// [parenthesizedAsyncArrowFunction.ts]
// Repro from #20096

let foo = (async bar => bar);

const a = true;
const b = 1;
const c = [b];

function async(...c: number[]): number {
    return b;
}

const f1 = a ? async() : 0;
const f2 = a ? async() : x => x;
const f3 = a ? a ? async() : 0 : b;
const f4 = a ? x => async() : x => x;
const f5 = a ? async (): Promise<number> => b : () => b;
const f6 = a ? async (): Promise<number> => { return b; } : () => b;
const f7 = a ? async (): Promise<number> => a ? async() : 0 : () => b;
const f8 = a ? (): number => b : () => b;

const f9 = a ? async(...c) : 0;
const f10 = a ? async(...c) : x => x;
const f11 = a ? async (...c: number[]): Promise<number> => c.length : () => 0;
const f12 = a ? async() : x => async (...c): Promise<number> => c.length;

type T = Promise<number>;
const f13 = a ? async() : x => async (): Promise<number> => b;
const f14 = a ? async() : x => async (): T => 0;
const f15 = a ? (b) : x => async (): T => 0;
const f16 = a ? async(...c) : x => async (): T => 0;
const f17 = a ? async() : x => (y): number => y;
const f18 = a ? async() : x => async <U>(): T => 0;
const f19 = a ? async(...c) : x => (y): number => y;
const f20 = a ? async(...c) : x => async <U>(): T => 0;
const f21 = a ? (x): number => (b): T => 0;
const f22 = a ? async <U>(): Promise<number> => (b): T => 0;
const f23 = a ? async () => async() : x => x;
const f24 = a ? async (...c) => async() : x => x;
const f25 = a ? () => async() : x => x;
const f26 = a ? async (c: number): Promise<number> => async() : x => x;

function* g() {
    const f1 = a ? yield async(...c) : 0;
    const f2 = a ? yield async(...c) : x => x;
}


//// [parenthesizedAsyncArrowFunction.js]
"use strict";
// Repro from #20096
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let foo = ((bar) => __awaiter(void 0, void 0, void 0, function* () { return bar; }));
const a = true;
const b = 1;
const c = [b];
function async(...c) {
    return b;
}
const f1 = a ? async() : 0;
const f2 = a ? async() : x => x;
const f3 = a ? a ? async() : 0 : b;
const f4 = a ? x => async() : x => x;
const f5 = a ? () => __awaiter(void 0, void 0, void 0, function* () { return b; }) : () => b;
const f6 = a ? () => __awaiter(void 0, void 0, void 0, function* () { return b; }) : () => b;
const f7 = a ? () => __awaiter(void 0, void 0, void 0, function* () { return a ? async() : 0; }) : () => b;
const f8 = a ? () => b : () => b;
const f9 = a ? async(...c) : 0;
const f10 = a ? async(...c) : x => x;
const f11 = a ? (...c) => __awaiter(void 0, void 0, void 0, function* () { return c.length; }) : () => 0;
const f12 = a ? async() : x => (...c) => __awaiter(void 0, void 0, void 0, function* () { return c.length; });
const f13 = a ? async() : x => () => __awaiter(void 0, void 0, void 0, function* () { return b; });
const f14 = a ? async() : x => () => __awaiter(void 0, void 0, void 0, function* () { return 0; });
const f15 = a ? (b) : x => () => __awaiter(void 0, void 0, void 0, function* () { return 0; });
const f16 = a ? async(...c) : x => () => __awaiter(void 0, void 0, void 0, function* () { return 0; });
const f17 = a ? async() : x => (y) => y;
const f18 = a ? async() : x => () => __awaiter(void 0, void 0, void 0, function* () { return 0; });
const f19 = a ? async(...c) : x => (y) => y;
const f20 = a ? async(...c) : x => () => __awaiter(void 0, void 0, void 0, function* () { return 0; });
const f21 = a ? (x) => (b) : T => 0;
const f22 = a ? () => __awaiter(void 0, void 0, void 0, function* () { return (b); }) : T => 0;
const f23 = a ? () => __awaiter(void 0, void 0, void 0, function* () { return async(); }) : x => x;
const f24 = a ? (...c) => __awaiter(void 0, void 0, void 0, function* () { return async(); }) : x => x;
const f25 = a ? () => async() : x => x;
const f26 = a ? (c) => __awaiter(void 0, void 0, void 0, function* () { return async(); }) : x => x;
function* g() {
    const f1 = a ? yield async(...c) : 0;
    const f2 = a ? yield async(...c) : x => x;
}
