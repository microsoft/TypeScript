// @target: es2015
// @strict: false
// Repro from #20096

let foo = (async bar => bar);

const a = true;
const b = 1;
const c = [b];

function async(...c: number[]): number {
    return b;
}

const f1 = a ? async() : 0;
const f2 = a ? async() : x => x;
const f3 = a ? a ? async() : 0 : b;
const f4 = a ? x => async() : x => x;
const f5 = a ? async (): Promise<number> => b : () => b;
const f6 = a ? async (): Promise<number> => { return b; } : () => b;
const f7 = a ? async (): Promise<number> => a ? async() : 0 : () => b;
const f8 = a ? (): number => b : () => b;

const f9 = a ? async(...c) : 0;
const f10 = a ? async(...c) : x => x;
const f11 = a ? async (...c: number[]): Promise<number> => c.length : () => 0;
const f12 = a ? async() : x => async (...c): Promise<number> => c.length;

type T = Promise<number>;
const f13 = a ? async() : x => async (): Promise<number> => b;
const f14 = a ? async() : x => async (): T => 0;
const f15 = a ? (b) : x => async (): T => 0;
const f16 = a ? async(...c) : x => async (): T => 0;
const f17 = a ? async() : x => (y): number => y;
const f18 = a ? async() : x => async <U>(): T => 0;
const f19 = a ? async(...c) : x => (y): number => y;
const f20 = a ? async(...c) : x => async <U>(): T => 0;
const f21 = a ? (x): number => (b): T => 0;
const f22 = a ? async <U>(): Promise<number> => (b): T => 0;
const f23 = a ? async () => async() : x => x;
const f24 = a ? async (...c) => async() : x => x;
const f25 = a ? () => async() : x => x;
const f26 = a ? async (c: number): Promise<number> => async() : x => x;
const f27 = a ? async (): Promise<number> => async() : x => x;
const f28 = a ? async (): Promise<number> => async(...c) : x => x;
const f29 = a ? async (...c): Promise<number> => async() : x => x;
const f30 = a ? async <U>(): Promise<number> => async() : x => x;
const f31 = a ? async (): (Promise<number>) => async() : x => x;
const f32 = a ? async (...c: number[]): Promise<number> => async() : x => x;

const f33 = a ? async() : 0
{}
const f34 = a ? async() : {}
{}

function* g() {
    const f1 = a ? yield async(...c) : 0;
    const f2 = a ? yield async(...c) : x => x;
}
