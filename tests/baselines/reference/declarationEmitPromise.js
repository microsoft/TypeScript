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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
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
export declare function runSampleWorks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<(<T>(f: (a: A, b?: B, c?: C, d?: D, e?: E) => T) => T) & {}>;
export declare function runSampleBreaks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<<T>(f: (a: A, b?: B, c?: C, d?: D, e?: E) => T) => T>;


//// [DtsFileErrors]


tests/cases/compiler/declarationEmitPromise.d.ts(5,141): error TS2314: Generic type 'Promise<T>' requires 1 type argument(s).
tests/cases/compiler/declarationEmitPromise.d.ts(5,148): error TS1144: '{' or ';' expected.
tests/cases/compiler/declarationEmitPromise.d.ts(5,150): error TS2304: Cannot find name 'T'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,153): error TS2304: Cannot find name 'f'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,154): error TS1005: ')' expected.
tests/cases/compiler/declarationEmitPromise.d.ts(5,160): error TS2304: Cannot find name 'A'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,167): error TS2304: Cannot find name 'B'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,174): error TS2304: Cannot find name 'C'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,181): error TS2304: Cannot find name 'D'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,188): error TS2304: Cannot find name 'E'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,194): error TS2304: Cannot find name 'T'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,195): error TS1005: ';' expected.
tests/cases/compiler/declarationEmitPromise.d.ts(5,197): error TS1128: Declaration or statement expected.
tests/cases/compiler/declarationEmitPromise.d.ts(5,200): error TS2304: Cannot find name 'T'.
tests/cases/compiler/declarationEmitPromise.d.ts(5,202): error TS1109: Expression expected.


==== tests/cases/compiler/declarationEmitPromise.d.ts (15 errors) ====
    export declare class bluebird<T> {
        static all: Array<bluebird<any>>;
    }
    export declare function runSampleWorks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<(<T>(f: (a: A, b?: B, c?: C, d?: D, e?: E) => T) => T) & {}>;
    export declare function runSampleBreaks<A, B, C, D, E>(a: bluebird<A>, b?: bluebird<B>, c?: bluebird<C>, d?: bluebird<D>, e?: bluebird<E>): Promise<<T>(f: (a: A, b?: B, c?: C, d?: D, e?: E) => T) => T>;
                                                                                                                                                ~~~~~~~
!!! error TS2314: Generic type 'Promise<T>' requires 1 type argument(s).
                                                                                                                                                       ~~
!!! error TS1144: '{' or ';' expected.
                                                                                                                                                         ~
!!! error TS2304: Cannot find name 'T'.
                                                                                                                                                            ~
!!! error TS2304: Cannot find name 'f'.
                                                                                                                                                             ~
!!! error TS1005: ')' expected.
                                                                                                                                                                   ~
!!! error TS2304: Cannot find name 'A'.
                                                                                                                                                                          ~
!!! error TS2304: Cannot find name 'B'.
                                                                                                                                                                                 ~
!!! error TS2304: Cannot find name 'C'.
                                                                                                                                                                                        ~
!!! error TS2304: Cannot find name 'D'.
                                                                                                                                                                                               ~
!!! error TS2304: Cannot find name 'E'.
                                                                                                                                                                                                     ~
!!! error TS2304: Cannot find name 'T'.
                                                                                                                                                                                                      ~
!!! error TS1005: ';' expected.
                                                                                                                                                                                                        ~~
!!! error TS1128: Declaration or statement expected.
                                                                                                                                                                                                           ~
!!! error TS2304: Cannot find name 'T'.
                                                                                                                                                                                                             ~
!!! error TS1109: Expression expected.
    