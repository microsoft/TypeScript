//// [tests/cases/conformance/async/es6/asyncAwaitIsolatedModules_es6.ts] ////

//// [asyncAwaitIsolatedModules_es6.ts]
import { MyPromise } from "missing";

declare var p: Promise<number>;
declare var mp: MyPromise<number>;

async function f0() { }
async function f1(): Promise<void> { }
async function f3(): MyPromise<void> { }

let f4 = async function() { }
let f5 = async function(): Promise<void> { }
let f6 = async function(): MyPromise<void> { }

let f7 = async () => { };
let f8 = async (): Promise<void> => { };
let f9 = async (): MyPromise<void> => { }; 
let f10 = async () => p;
let f11 = async () => mp;
let f12 = async (): Promise<number> => mp;
let f13 = async (): MyPromise<number> => p;

let o = {
	async m1() { },
	async m2(): Promise<void> { },
	async m3(): MyPromise<void> { }
};

class C {
	async m1() { }
	async m2(): Promise<void> { }
	async m3(): MyPromise<void> { }
	static async m4() { }
	static async m5(): Promise<void> { }
	static async m6(): MyPromise<void> { }
}

module M {
	export async function f1() { }
}

//// [asyncAwaitIsolatedModules_es6.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f0() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function f1() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function f3() {
    return __awaiter(this, void 0, void 0, function* () { });
}
let f4 = function () {
    return __awaiter(this, void 0, void 0, function* () { });
};
let f5 = function () {
    return __awaiter(this, void 0, void 0, function* () { });
};
let f6 = function () {
    return __awaiter(this, void 0, void 0, function* () { });
};
let f7 = () => __awaiter(void 0, void 0, void 0, function* () { });
let f8 = () => __awaiter(void 0, void 0, void 0, function* () { });
let f9 = () => __awaiter(void 0, void 0, void 0, function* () { });
let f10 = () => __awaiter(void 0, void 0, void 0, function* () { return p; });
let f11 = () => __awaiter(void 0, void 0, void 0, function* () { return mp; });
let f12 = () => __awaiter(void 0, void 0, void 0, function* () { return mp; });
let f13 = () => __awaiter(void 0, void 0, void 0, function* () { return p; });
let o = {
    m1() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    m2() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    m3() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
class C {
    m1() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    m2() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    m3() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static m4() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static m5() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static m6() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
var M;
(function (M) {
    function f1() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    M.f1 = f1;
})(M || (M = {}));
export {};
