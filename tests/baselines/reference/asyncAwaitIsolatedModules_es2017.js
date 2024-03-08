//// [tests/cases/conformance/async/es2017/asyncAwaitIsolatedModules_es2017.ts] ////

//// [asyncAwaitIsolatedModules_es2017.ts]
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

//// [asyncAwaitIsolatedModules_es2017.js]
async function f0() { }
async function f1() { }
async function f3() { }
let f4 = async function () { };
let f5 = async function () { };
let f6 = async function () { };
let f7 = async () => { };
let f8 = async () => { };
let f9 = async () => { };
let f10 = async () => p;
let f11 = async () => mp;
let f12 = async () => mp;
let f13 = async () => p;
let o = {
    async m1() { },
    async m2() { },
    async m3() { }
};
class C {
    async m1() { }
    async m2() { }
    async m3() { }
    static async m4() { }
    static async m5() { }
    static async m6() { }
}
var M;
(function (M) {
    async function f1() { }
    M.f1 = f1;
})(M || (M = {}));
export {};
