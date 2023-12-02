// @declaration: true
// @target: ESNext
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed
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

