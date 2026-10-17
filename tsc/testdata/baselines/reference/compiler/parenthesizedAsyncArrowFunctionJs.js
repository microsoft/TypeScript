//// [tests/cases/compiler/parenthesizedAsyncArrowFunctionJs.ts] ////

//// [a.js]
const a = true;
const b = 1;
const c = [b];

function async(...c) {
    return b;
}

const f1 = a ? async(...c) : 0;
const f2 = a ? async(...c) : x => x;
const f3 = a ? async () => async() : x => x;
const f4 = a ? async (...c) => async() : x => x;
const f5 = a ? () => async() : x => x;

function* g() {
    const f1 = a ? yield async(...c) : 0;
    const f2 = a ? yield async(...c) : x => x;
}


//// [a.js]
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
const a = true;
const b = 1;
const c = [b];
function async(...c) {
    return b;
}
const f1 = a ? async(...c) : 0;
const f2 = a ? async(...c) : x => x;
const f3 = a ? () => __awaiter(void 0, void 0, void 0, function* () { return async(); }) : x => x;
const f4 = a ? (...c) => __awaiter(void 0, void 0, void 0, function* () { return async(); }) : x => x;
const f5 = a ? () => async() : x => x;
function* g() {
    const f1 = a ? yield async(...c) : 0;
    const f2 = a ? yield async(...c) : x => x;
}
