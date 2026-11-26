//// [tests/cases/compiler/jsFileCompilationAwaitModifier.ts] ////

//// [a.js]
class Foo {
    async a() {
        await Promise.resolve(1);
    }

    b = async () => {
        await Promise.resolve(1);
    }
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Foo {
    constructor() {
        this.b = __setFunctionName(() => __awaiter(this, void 0, void 0, function* () {
            yield Promise.resolve(1);
        }), "b");
    }
    a() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.resolve(1);
        });
    }
}


//// [a.d.ts]
declare class Foo {
    a(): Promise<void>;
    b: () => Promise<void>;
}
