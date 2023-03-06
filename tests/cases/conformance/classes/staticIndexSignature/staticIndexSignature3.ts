// @strict: true

class B {
    static readonly [s: string]: number;
    static readonly [s: number]: 42 | 233
}

class D extends B {
    static readonly [s: string]: number
}

class ED extends D {
    static readonly [s: string]: boolean
    static readonly [s: number]: 1 
}

class DD extends D {
    static readonly [s: string]: 421
}

const a = B["f"];
const b =  B[42];
const c = D["f"]
const d = D[42]
const e = ED["f"]
const f = ED[42]
const g = DD["f"]
const h = DD[42]
