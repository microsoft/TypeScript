//// [awaited.ts]
// simple
declare const p0: Promise<number>;
p0.then(x => x);

declare const p1: Promise<Promise<number>>;
p1.then(x => x);

declare const p2: Promise<number | Promise<number>>;
p2.then(x => x);

// generics
declare const f: boolean;
declare function makePromise<T>(x: T): Promise<T>;
makePromise(1).then(x => x);
makePromise("a").then(x => x);
makePromise({ a: 1 }).then(x => x);
makePromise(f ? 1 : "a").then(x => x);

function f0<U>(u: U) {
    return makePromise(u).then(x => x);
}
f0(1).then(x => x);
f0("a").then(x => x);
f0(f ? 1 : "a").then(x => x);
f0(makePromise(1)).then(x => x);

function f1<U, V>(u: U, v: V) {
    return makePromise(u).then(x => {
        if (f) return x;
        return makePromise(v).then(x => x);
    });
}
f1(1, "a").then(x => x);
f1(makePromise(1), makePromise("a")).then(x => x);

function f2<U>(u: U) {
    return makePromise(u).then(x => {
        if (f) return x;
        return Promise.reject("b");
    });
}
f2(1).then(x => x);
f2(makePromise(1)).then(x => x);

function f3<U, V>(u: U, v: V) {
    return makePromise(u).catch(x => v);
}
f3(1, "a").then(x => x);
f3(makePromise(1), makePromise("a")).then(x => x);

function f4<U, V>(u: U, v: V) {
    return makePromise(u).catch(x => {
        if (f) return v;
        return Promise.reject("b");
    });
}
f4(1, "a").then(x => x);
f4(makePromise(1), makePromise("a")).then(x => x);

async function f5<U>(u: Promise<U>) {
    return await u;
}
f5(makePromise(1)).then(x => x);
f5(makePromise(makePromise(1))).then(x => x);

async function f6<U>(u: Promise<Promise<U>>) {
    return await u;
}

// assignability
let v0: number;
let v1: awaited number;
let v2: awaited Promise<number>;
v0 = v1;
v0 = v2;
v1 = v0;
v1 = v2;
v2 = v0;
v2 = v1;

function f7<U>() {
    let v0: awaited U;
    let v1: awaited Promise<U>;
    v0 = v1;
    v1 = v0;
}

async function f8<U>() {
    let pu: Promise<U>;
    let v0: awaited U;
    let v1: awaited Promise<U>;
    v0 = await pu;
    v1 = await pu;
}

//// [awaited.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
p0.then(x => x);
p1.then(x => x);
p2.then(x => x);
makePromise(1).then(x => x);
makePromise("a").then(x => x);
makePromise({ a: 1 }).then(x => x);
makePromise(f ? 1 : "a").then(x => x);
function f0(u) {
    return makePromise(u).then(x => x);
}
f0(1).then(x => x);
f0("a").then(x => x);
f0(f ? 1 : "a").then(x => x);
f0(makePromise(1)).then(x => x);
function f1(u, v) {
    return makePromise(u).then(x => {
        if (f)
            return x;
        return makePromise(v).then(x => x);
    });
}
f1(1, "a").then(x => x);
f1(makePromise(1), makePromise("a")).then(x => x);
function f2(u) {
    return makePromise(u).then(x => {
        if (f)
            return x;
        return Promise.reject("b");
    });
}
f2(1).then(x => x);
f2(makePromise(1)).then(x => x);
function f3(u, v) {
    return makePromise(u).catch(x => v);
}
f3(1, "a").then(x => x);
f3(makePromise(1), makePromise("a")).then(x => x);
function f4(u, v) {
    return makePromise(u).catch(x => {
        if (f)
            return v;
        return Promise.reject("b");
    });
}
f4(1, "a").then(x => x);
f4(makePromise(1), makePromise("a")).then(x => x);
function f5(u) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield u;
    });
}
f5(makePromise(1)).then(x => x);
f5(makePromise(makePromise(1))).then(x => x);
function f6(u) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield u;
    });
}
// assignability
let v0;
let v1;
let v2;
v0 = v1;
v0 = v2;
v1 = v0;
v1 = v2;
v2 = v0;
v2 = v1;
function f7() {
    let v0;
    let v1;
    v0 = v1;
    v1 = v0;
}
function f8() {
    return __awaiter(this, void 0, void 0, function* () {
        let pu;
        let v0;
        let v1;
        v0 = yield pu;
        v1 = yield pu;
    });
}


//// [awaited.d.ts]
declare const p0: Promise<number>;
declare const p1: Promise<Promise<number>>;
declare const p2: Promise<number | Promise<number>>;
declare const f: boolean;
declare function makePromise<T>(x: T): Promise<T>;
declare function f0<U>(u: U): Promise<awaited U>;
declare function f1<U, V>(u: U, v: V): Promise<awaited U | awaited V>;
declare function f2<U>(u: U): Promise<awaited U>;
declare function f3<U, V>(u: U, v: V): Promise<awaited U | awaited V>;
declare function f4<U, V>(u: U, v: V): Promise<awaited V | awaited U>;
declare function f5<U>(u: Promise<U>): Promise<U>;
declare function f6<U>(u: Promise<Promise<U>>): Promise<U>;
declare let v0: number;
declare let v1: awaited number;
declare let v2: awaited Promise<number>;
declare function f7<U>(): void;
declare function f8<U>(): Promise<void>;
