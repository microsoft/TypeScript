//// [tests/cases/compiler/isolatedDeclarationBinderSignatures.ts] ////

//// [isolatedDeclarationBinderSignatures.ts]
type N = "not used";
const N = "not used"
export type F = <N>() => N;

export const fn = <N>(): N  => {
    return null!;
}
export const fn2 = <N>(p:  N): void => {
    return null!
}


export module M1 {
    export type N<T> =  T extends T? N<T> : never;
    export function N(): typeof N {
        return N
    }
}

export module M2 {
    export interface N { 
        child: N
        m(): N;
        get X(): N
        set X(value: N);
    }
}

export module M3 {
    export interface N { 
        [n: string]: N
    }
}
export module M3 {
    export class N { child: N }
    export function fn(): N {
        return new N();
    }
}
export module M4 {
    export module N {
        export function fn(): typeof N {
            return N;
        }
    }
}


export const fn3 = function <N>(p: N): void {
    
}

export const fn4 = function <N>(): { name: N } {
    return null!;
}

export interface I<N> {
    (): N;
    new (): N
    m(): N;
}

export interface I2<N> {
    [n: string]: N
}

export interface I1 {
    <N>(): N;
    new <N>(): N
    m<N>(): N;
}


export interface I<N> {
    (): N;
    new (): N
    m(): N;
}

export class C<N> {
    constructor(n: N) {

    }
    m(): N {
        return null!;
    }
    get N(): N { return null! }
    set N(value) { }
}

export class C2 {
    m<N>(): N {
        return null!;
    }
}



//// [isolatedDeclarationBinderSignatures.js]
const N = "not used";
export const fn = () => {
    return null;
};
export const fn2 = (p) => {
    return null;
};
export var M1;
(function (M1) {
    function N() {
        return N;
    }
    M1.N = N;
})(M1 || (M1 = {}));
export var M3;
(function (M3) {
    class N {
        child;
    }
    M3.N = N;
    function fn() {
        return new N();
    }
    M3.fn = fn;
})(M3 || (M3 = {}));
export var M4;
(function (M4) {
    let N;
    (function (N) {
        function fn() {
            return N;
        }
        N.fn = fn;
    })(N = M4.N || (M4.N = {}));
})(M4 || (M4 = {}));
export const fn3 = function (p) {
};
export const fn4 = function () {
    return null;
};
export class C {
    constructor(n) {
    }
    m() {
        return null;
    }
    get N() { return null; }
    set N(value) { }
}
export class C2 {
    m() {
        return null;
    }
}


//// [isolatedDeclarationBinderSignatures.d.ts]
export type F = <N>() => N;
export declare const fn: <N>() => N;
export declare const fn2: <N>(p: N) => void;
export declare namespace M1 {
    type N<T> = T extends T ? N<T> : never;
    function N(): typeof N;
}
export declare namespace M2 {
    interface N {
        child: N;
        m(): N;
        get X(): N;
        set X(value: N);
    }
}
export declare namespace M3 {
    interface N {
        [n: string]: N;
    }
}
export declare namespace M3 {
    class N {
        child: N;
    }
    function fn(): N;
}
export declare namespace M4 {
    namespace N {
        function fn(): typeof N;
    }
}
export declare const fn3: <N>(p: N) => void;
export declare const fn4: <N>() => {
    name: N;
};
export interface I<N> {
    (): N;
    new (): N;
    m(): N;
}
export interface I2<N> {
    [n: string]: N;
}
export interface I1 {
    <N>(): N;
    new <N>(): N;
    m<N>(): N;
}
export interface I<N> {
    (): N;
    new (): N;
    m(): N;
}
export declare class C<N> {
    constructor(n: N);
    m(): N;
    get N(): N;
    set N(value: N);
}
export declare class C2 {
    m<N>(): N;
}
