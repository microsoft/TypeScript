// @target: es2015
// @lib: es2015, dom
// @noEmit: true


declare const P: Promise<void>;
declare const a: number;
declare const b: Promise<number>;
declare const c: Promise<number> | Promise<string>;
declare const d: Promise<number> | string;
declare const e: Promise<number> | string | boolean;
declare const f: number | string;
declare const g: PromiseBase<string, Error, number, object, string, boolean, any, Element, never, never, never, never>;

// native promise inference
P.then(() => a); // Promise<number>
P.then(() => b); // Promise<number>
P.then(() => c); // Promise<string | number>
P.then(() => d); // Promise<string | number>
P.then(() => e); // Promise<string | number | boolean>
P.then(() => f); // Promise<string | number>
P.then(() => g); // Promise<string>

Promise.resolve(a); // Promise<number>
Promise.resolve(b); // Promise<number>
Promise.resolve(c); // Promise<string | number>
Promise.resolve(d); // Promise<string | number>
Promise.resolve(e); // Promise<string | number | boolean>
Promise.resolve(f); // Promise<string | number>
Promise.resolve(g); // Promise<string>

// userland promise inference with more complex fulfillment types
g.then(() => a); // PromiseBase<number, ...>
g.then(() => b); // PromiseBase<number, ...>
g.then(() => c); // PromiseBase<string | number, ...>
g.then(() => d); // PromiseBase<string | number, ...>
g.then(() => e); // PromiseBase<string | number | boolean, ...>
g.then(() => f); // PromiseBase<string | number, ...>

// adapted from DefinitelyTyped: /types/jquery/jquery-tests.ts
g.then(() => g).then(
    (tr, ur, vr) => {
        tr; // string
        ur; // object
        vr; // any
    },
    (tj, uj, vj) => {
        tj; // Error
        uj; // string
        vj; // Element
    },
    (tn, un, vn) => {
        tn; // number
        un; // boolean
        vn; // never
    });

// JQuery's PromiseBase
interface Thenable<T> extends PromiseLike<T> {}
interface PromiseBase<
    TR, TJ, TN,
    UR, UJ, UN,
    VR, VJ, VN,
    SR, SJ, SN
> {
    then<ARD = never, AJD = never, AND = never,
        BRD = never, BJD = never, BND = never,
        CRD = never, CJD = never, CND = never,
        RRD = never, RJD = never, RND = never,
        ARF = never, AJF = never, ANF = never,
        BRF = never, BJF = never, BNF = never,
        CRF = never, CJF = never, CNF = never,
        RRF = never, RJF = never, RNF = never,
        ARP = never, AJP = never, ANP = never,
        BRP = never, BJP = never, BNP = never,
        CRP = never, CJP = never, CNP = never,
        RRP = never, RJP = never, RNP = never>(
            doneFilter: (t: TR, u: UR, v: VR, ...s: SR[]) => PromiseBase<ARD, AJD, AND,
                BRD, BJD, BND,
                CRD, CJD, CND,
                RRD, RJD, RND> | Thenable<ARD> | ARD,
            failFilter: (t: TJ, u: UJ, v: VJ, ...s: SJ[]) => PromiseBase<ARF, AJF, ANF,
                BRF, BJF, BNF,
                CRF, CJF, CNF,
                RRF, RJF, RNF> | Thenable<ARF> | ARF,
            progressFilter: (t: TN, u: UN, v: VN, ...s: SN[]) => PromiseBase<ARP, AJP, ANP,
                BRP, BJP, BNP,
                CRP, CJP, CNP,
                RRP, RJP, RNP> | Thenable<ANP> | ANP): PromiseBase<ARD | ARF | ARP, AJD | AJF | AJP, AND | ANF | ANP,
        BRD | BRF | BRP, BJD | BJF | BJP, BND | BNF | BNP,
        CRD | CRF | CRP, CJD | CJF | CJP, CND | CNF | CNP,
        RRD | RRF | RRP, RJD | RJF | RJP, RND | RNF | RNP>;
    then<ARF = never, AJF = never, ANF = never,
        BRF = never, BJF = never, BNF = never,
        CRF = never, CJF = never, CNF = never,
        RRF = never, RJF = never, RNF = never,
        ARP = never, AJP = never, ANP = never,
        BRP = never, BJP = never, BNP = never,
        CRP = never, CJP = never, CNP = never,
        RRP = never, RJP = never, RNP = never>(
            doneFilter: null,
            failFilter: (t: TJ, u: UJ, v: VJ, ...s: SJ[]) => PromiseBase<ARF, AJF, ANF,
                BRF, BJF, BNF,
                CRF, CJF, CNF,
                RRF, RJF, RNF> | Thenable<ARF> | ARF,
            progressFilter: (t: TN, u: UN, v: VN, ...s: SN[]) => PromiseBase<ARP, AJP, ANP,
                BRP, BJP, BNP,
                CRP, CJP, CNP,
                RRP, RJP, RNP> | Thenable<ANP> | ANP): PromiseBase<ARF | ARP, AJF | AJP, ANF | ANP,
        BRF | BRP, BJF | BJP, BNF | BNP,
        CRF | CRP, CJF | CJP, CNF | CNP,
        RRF | RRP, RJF | RJP, RNF | RNP>;
    then<ARD = never, AJD = never, AND = never,
        BRD = never, BJD = never, BND = never,
        CRD = never, CJD = never, CND = never,
        RRD = never, RJD = never, RND = never,
        ARP = never, AJP = never, ANP = never,
        BRP = never, BJP = never, BNP = never,
        CRP = never, CJP = never, CNP = never,
        RRP = never, RJP = never, RNP = never>(
            doneFilter: (t: TR, u: UR, v: VR, ...s: SR[]) => PromiseBase<ARD, AJD, AND,
                BRD, BJD, BND,
                CRD, CJD, CND,
                RRD, RJD, RND> | Thenable<ARD> | ARD,
            failFilter: null,
            progressFilter: (t: TN, u: UN, v: VN, ...s: SN[]) => PromiseBase<ARP, AJP, ANP,
                BRP, BJP, BNP,
                CRP, CJP, CNP,
                RRP, RJP, RNP> | Thenable<ANP> | ANP): PromiseBase<ARD | ARP, AJD | AJP, AND | ANP,
        BRD | BRP, BJD | BJP, BND | BNP,
        CRD | CRP, CJD | CJP, CND | CNP,
        RRD | RRP, RJD | RJP, RND | RNP>;
    then<ARP = never, AJP = never, ANP = never,
        BRP = never, BJP = never, BNP = never,
        CRP = never, CJP = never, CNP = never,
        RRP = never, RJP = never, RNP = never>(
            doneFilter: null,
            failFilter: null,
            progressFilter?: (t: TN, u: UN, v: VN, ...s: SN[]) => PromiseBase<ARP, AJP, ANP,
                BRP, BJP, BNP,
                CRP, CJP, CNP,
                RRP, RJP, RNP> | Thenable<ANP> | ANP): PromiseBase<ARP, AJP, ANP,
        BRP, BJP, BNP,
        CRP, CJP, CNP,
        RRP, RJP, RNP>;
    then<ARD = never, AJD = never, AND = never,
        BRD = never, BJD = never, BND = never,
        CRD = never, CJD = never, CND = never,
        RRD = never, RJD = never, RND = never,
        ARF = never, AJF = never, ANF = never,
        BRF = never, BJF = never, BNF = never,
        CRF = never, CJF = never, CNF = never,
        RRF = never, RJF = never, RNF = never>(
            doneFilter: (t: TR, u: UR, v: VR, ...s: SR[]) => PromiseBase<ARD, AJD, AND,
                BRD, BJD, BND,
                CRD, CJD, CND,
                RRD, RJD, RND> | Thenable<ARD> | ARD,
            failFilter: (t: TJ, u: UJ, v: VJ, ...s: SJ[]) => PromiseBase<ARF, AJF, ANF,
                BRF, BJF, BNF,
                CRF, CJF, CNF,
                RRF, RJF, RNF> | Thenable<ARF> | ARF,
            progressFilter?: null): PromiseBase<ARD | ARF, AJD | AJF, AND | ANF,
        BRD | BRF, BJD | BJF, BND | BNF,
        CRD | CRF, CJD | CJF, CND | CNF,
        RRD | RRF, RJD | RJF, RND | RNF>;
    then<ARF = never, AJF = never, ANF = never,
        BRF = never, BJF = never, BNF = never,
        CRF = never, CJF = never, CNF = never,
        RRF = never, RJF = never, RNF = never>(
            doneFilter: null,
            failFilter: (t: TJ, u: UJ, v: VJ, ...s: SJ[]) => PromiseBase<ARF, AJF, ANF,
                BRF, BJF, BNF,
                CRF, CJF, CNF,
                RRF, RJF, RNF> | Thenable<ARF> | ARF,
            progressFilter?: null): PromiseBase<ARF, AJF, ANF,
        BRF, BJF, BNF,
        CRF, CJF, CNF,
        RRF, RJF, RNF>;
    then<ARD = never, AJD = never, AND = never,
        BRD = never, BJD = never, BND = never,
        CRD = never, CJD = never, CND = never,
        RRD = never, RJD = never, RND = never>(
            doneFilter: (t: TR, u: UR, v: VR, ...s: SR[]) => PromiseBase<ARD, AJD, AND,
                BRD, BJD, BND,
                CRD, CJD, CND,
                RRD, RJD, RND> | Thenable<ARD> | ARD,
            failFilter?: null,
            progressFilter?: null): PromiseBase<ARD, AJD, AND,
        BRD, BJD, BND,
        CRD, CJD, CND,
        RRD, RJD, RND>;
    catch<ARF = never, AJF = never, ANF = never,
        BRF = never, BJF = never, BNF = never,
        CRF = never, CJF = never, CNF = never,
        RRF = never, RJF = never, RNF = never>(
            failFilter?: ((t: TJ, u: UJ, v: VJ, ...s: SJ[]) => PromiseBase<ARF, AJF, ANF,
                BRF, BJF, BNF,
                CRF, CJF, CNF,
                RRF, RJF, RNF> | Thenable<ARF> | ARF) | null): PromiseBase<ARF, AJF, ANF,
        BRF, BJF, BNF,
        CRF, CJF, CNF,
        RRF, RJF, RNF>;
}
