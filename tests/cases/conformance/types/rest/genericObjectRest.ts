// @strict: true
// @target: es2015

const a = 'a';

function f1<T extends { a: string, b: number }>(obj: T) {
    let { ...r0 } = obj;
    let { a: a1, ...r1 } = obj;
    let { a: a2, b: b2, ...r2 } = obj;
    let { 'a': a3, ...r3 } = obj;
    let { ['a']: a4, ...r4 } = obj;
    let { [a]: a5, ...r5 } = obj;
}

const sa = Symbol();
const sb = Symbol();

function f2<T extends { [sa]: string, [sb]: number }>(obj: T) {
    let { [sa]: a1, [sb]: b1, ...r1 } = obj;
}

function f3<T, K1 extends keyof T, K2 extends keyof T>(obj: T, k1: K1, k2: K2) {
    let { [k1]: a1, [k2]: a2, ...r1 } = obj;
}

type Item = { a: string, b: number, c: boolean };

function f4<K1 extends keyof Item, K2 extends keyof Item>(obj: Item, k1: K1, k2: K2) {
    let { [k1]: a1, [k2]: a2, ...r1 } = obj;
}
