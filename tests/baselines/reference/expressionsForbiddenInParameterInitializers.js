//// [tests/cases/compiler/expressionsForbiddenInParameterInitializers.ts] ////

//// [bar.ts]
export async function foo({ foo = await import("./bar") }) {
}

export function* foo2({ foo = yield "a" }) {
}


//// [bar.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.foo2 = foo2;
function foo(_a) {
    return __awaiter(this, arguments, void 0, function* ({ foo = yield Promise.resolve().then(() => require("./bar")) }) {
    });
}
function* foo2({ foo = yield "a" }) {
}
