// @target: es2015
// @declaration: true
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