//// [tests/cases/compiler/asyncFunctionContextuallyTypedReturns.ts] ////

//// [asyncFunctionContextuallyTypedReturns.ts]
declare function f(cb: (v: boolean) => [0] | PromiseLike<[0]>): void;
f(v => v ? [0] : Promise.reject());
f(async v => v ? [0] : Promise.reject());

declare function g(cb: (v: boolean) => "contextuallyTypable" | PromiseLike<"contextuallyTypable">): void;
g(v => v ? "contextuallyTypable" : Promise.reject());
g(async v => v ? "contextuallyTypable" : Promise.reject());

type MyCallback = (thing: string) => void;
declare function h(cb: (v: boolean) => MyCallback | PromiseLike<MyCallback>): void;
h(v => v ? (abc) => { } : Promise.reject());
h(async v => v ? (def) => { } : Promise.reject());

// repro from #29196
const increment: (
  num: number,
  str: string
) => Promise<((s: string) => any) | string> | string = async (num, str) => {
  return a => {
    return a.length
  }
}

const increment2: (
  num: number,
  str: string
) => Promise<((s: string) => any) | string> = async (num, str) => {
  return a => {
    return a.length
  }
}


//// [asyncFunctionContextuallyTypedReturns.js]
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
f(v => v ? [0] : Promise.reject());
f((v) => __awaiter(void 0, void 0, void 0, function* () { return v ? [0] : Promise.reject(); }));
g(v => v ? "contextuallyTypable" : Promise.reject());
g((v) => __awaiter(void 0, void 0, void 0, function* () { return v ? "contextuallyTypable" : Promise.reject(); }));
h(v => v ? (abc) => { } : Promise.reject());
h((v) => __awaiter(void 0, void 0, void 0, function* () { return v ? (def) => { } : Promise.reject(); }));
// repro from #29196
const increment = (num, str) => __awaiter(void 0, void 0, void 0, function* () {
    return a => {
        return a.length;
    };
});
const increment2 = (num, str) => __awaiter(void 0, void 0, void 0, function* () {
    return a => {
        return a.length;
    };
});
