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
exports.runSampleBreaks = exports.runSampleWorks = exports.bluebird = void 0;
class bluebird {
}
exports.bluebird = bluebird;
function runSampleWorks(a, b, c, d, e) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield bluebird.all([a, b, c, d, e].filter(el => !!el));
        let func = (f) => f.apply(this, result);
        let rfunc = func; // <- This is the only difference
        return rfunc;
    });
}
exports.runSampleWorks = runSampleWorks;
function runSampleBreaks(a, b, c, d, e) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield bluebird.all([a, b, c, d, e].filter(el => !!el));
        let func = (f) => f.apply(this, result);
        let rfunc = func; // <- This is the only difference
        return rfunc;
    });
}
exports.runSampleBreaks = runSampleBreaks;


//// [declarationEmitPromise.d.ts]
export declare class bluebird<T> {
    static all: Array<bluebird<any>>;
}
export declare function runSampleWorks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<(<T>(f: (a: A_1, b?: B_1, c?: C_1, d?: D_1, e?: E_1) => T) => T)>;
export declare function runSampleBreaks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<(<T>(f: (a: A_1, b?: B_1, c?: C_1, d?: D_1, e?: E_1) => T) => T)>;


//// [DtsFileErrors]


tests/cases/compiler/declarationEmitPromise.d.ts(4,160): error TS2304: Cannot find name 'A_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(4,169): error TS2304: Cannot find name 'B_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(4,178): error TS2304: Cannot find name 'C_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(4,187): error TS2304: Cannot find name 'D_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(4,196): error TS2304: Cannot find name 'E_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,161): error TS2304: Cannot find name 'A_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,170): error TS2304: Cannot find name 'B_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,179): error TS2304: Cannot find name 'C_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,188): error TS2304: Cannot find name 'D_1'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,197): error TS2304: Cannot find name 'E_1'.


==== tests/cases/compiler/declarationEmitPromise.d.ts (10 errors) ====
    export declare class bluebird<T> {
        static all: Array<bluebird<any>>;
    }
    export declare function runSampleWorks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<(<T>(f: (a: A_1, b?: B_1, c?: C_1, d?: D_1, e?: E_1) => T) => T)>;
                                                                                                                                                                   ~~~
!!! error TS2304: Cannot find name 'A_1'.
                                                                                                                                                                            ~~~
!!! error TS2304: Cannot find name 'B_1'.
                                                                                                                                                                                     ~~~
!!! error TS2304: Cannot find name 'C_1'.
                                                                                                                                                                                              ~~~
!!! error TS2304: Cannot find name 'D_1'.
                                                                                                                                                                                                       ~~~
!!! error TS2304: Cannot find name 'E_1'.
    export declare function runSampleBreaks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<(<T>(f: (a: A_1, b?: B_1, c?: C_1, d?: D_1, e?: E_1) => T) => T)>;
                                                                                                                                                                    ~~~
!!! error TS2304: Cannot find name 'A_1'.
                                                                                                                                                                             ~~~
!!! error TS2304: Cannot find name 'B_1'.
                                                                                                                                                                                      ~~~
!!! error TS2304: Cannot find name 'C_1'.
                                                                                                                                                                                               ~~~
!!! error TS2304: Cannot find name 'D_1'.
                                                                                                                                                                                                        ~~~
!!! error TS2304: Cannot find name 'E_1'.
    