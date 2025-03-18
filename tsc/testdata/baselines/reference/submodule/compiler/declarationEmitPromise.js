//// [tests/cases/compiler/declarationEmitPromise.ts] ////

//// [declarationEmitPromise.ts]
export class bluebird<T> {
    static all: Array<bluebird<any>>;
}

export async function runSampleWorks<A, B, C, D, E>(
    a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>) {
    let result = await (bluebird.all as any)([a, b, c, d, e].filter(el => !!el));
    let func = <T>(f: (a: A, b?: B, c?: C, d?: D, e?: E) => T): T =>
        f.apply(this, result);
    let rfunc: typeof func & {} = func as any; // <- This is the only difference
    return rfunc
}

export async function runSampleBreaks<A, B, C, D, E>(
    a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>) {
    let result = await (bluebird.all as any)([a, b, c, d, e].filter(el => !!el));
    let func = <T>(f: (a: A, b?: B, c?: C, d?: D, e?: E) => T): T =>
        f.apply(this, result);
    let rfunc: typeof func = func as any; // <- This is the only difference
    return rfunc
}

//// [declarationEmitPromise.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluebird = void 0;
exports.runSampleWorks = runSampleWorks;
exports.runSampleBreaks = runSampleBreaks;
class bluebird {
    static all;
}
exports.bluebird = bluebird;
async function runSampleWorks(a, b, c, d, e) {
    let result = await bluebird.all([a, b, c, d, e].filter(el => !!el));
    let func = (f) => f.apply(this, result);
    let rfunc = func;
    return rfunc;
}
async function runSampleBreaks(a, b, c, d, e) {
    let result = await bluebird.all([a, b, c, d, e].filter(el => !!el));
    let func = (f) => f.apply(this, result);
    let rfunc = func;
    return rfunc;
}
