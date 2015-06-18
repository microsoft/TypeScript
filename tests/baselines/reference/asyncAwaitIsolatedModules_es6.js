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
var __awaiter = (this && this.__awaiter) || function (args, generator) {
    var PromiseConstructor = args[1] || Promise;
    return new PromiseConstructor(function (resolve, reject) {
        generator = generator.call(args[0], args[2]);
        function cast(value) { return value instanceof PromiseConstructor ? value : new PromiseConstructor(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
function f0() {
    return __awaiter([this], function* () { });
}
function f1() {
    return __awaiter([this, Promise], function* () { });
}
function f3() {
    return __awaiter([this, MyPromise], function* () { });
}
let f4 = function () {
    return __awaiter([this], function* () { });
};
let f5 = function () {
    return __awaiter([this, Promise], function* () { });
};
let f6 = function () {
    return __awaiter([this, MyPromise], function* () { });
};
let f7 = () => __awaiter([this], function* () { });
let f8 = () => __awaiter([this, Promise], function* () { });
let f9 = () => __awaiter([this, MyPromise], function* () { });
let f10 = () => __awaiter([this], function* () { return p; });
let f11 = () => __awaiter([this], function* () { return mp; });
let f12 = () => __awaiter([this, Promise], function* () { return mp; });
let f13 = () => __awaiter([this, MyPromise], function* () { return p; });
let o = {
    m1() {
        return __awaiter([this], function* () { });
    },
    m2() {
        return __awaiter([this, Promise], function* () { });
    },
    m3() {
        return __awaiter([this, MyPromise], function* () { });
    }
};
class C {
    m1() {
        return __awaiter([this], function* () { });
    }
    m2() {
        return __awaiter([this, Promise], function* () { });
    }
    m3() {
        return __awaiter([this, MyPromise], function* () { });
    }
    static m4() {
        return __awaiter([this], function* () { });
    }
    static m5() {
        return __awaiter([this, Promise], function* () { });
    }
    static m6() {
        return __awaiter([this, MyPromise], function* () { });
    }
}
var M;
(function (M) {
    function f1() {
        return __awaiter([this], function* () { });
    }
    M.f1 = f1;
})(M || (M = {}));
