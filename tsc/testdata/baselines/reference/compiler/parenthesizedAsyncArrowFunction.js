//// [tests/cases/compiler/parenthesizedAsyncArrowFunction.ts] ////

//// [parenthesizedAsyncArrowFunction.ts]
// Repro from #20096

let foo = (async bar => bar);

const a = true;
const b = 1;

function async(): number {
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
function async() {
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
