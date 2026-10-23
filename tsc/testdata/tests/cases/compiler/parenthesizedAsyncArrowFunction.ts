// @target: es2015
// @strict: false
// @filename: a.ts
// Repro from #20096

let foo = (async bar => bar);

const a = true;
const b = 1;
const c = [b];

function async<V>(...c: number[]): number {
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
const f14 = a ? async() : T => async (): T => 0;
const f15 = a ? (b) : x => async (): T => 0;
const f16 = a ? async(...c) : T => async (): T => 0;
const f17 = a ? async() : T => (b): number => b;
const f18 = a ? async() : T => async <U>(): T => 0;
const f19 = a ? async(...c) : T => (b): number => b;
const f20 = a ? async(...c) : T => async <U>(): T => 0;
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

const d = { a: c };
const e = () => c;
const f35 = async(...d.a);
const f36 = async(...e());
const f37 = async(...[b]);

type U = number;
const f38 = a ? (c): U => (b) : x => x;
const f39 = a ? async() : function() {};
const f40 = a ? async() : "b"
{}
const f41 = a ? async(...c) : 0
{}
const f42 = a ? (c) : 0
{}
const f43 = a ? async() : 0;
{}

const f44 = a ? async() : T => async (...c): T => c.length;

const f45 = a ? async (): T => (b) : d => d;
const f46 = a ? async (): T => async() : d => d;
const f47 = a ? async (): T => async() : b;
const f48 = a ? a ? async() : d => d : b;
const f49 = a ? a ? async(b) : d => d : b;
const f50 = a ? a ? async(...c) : d => d : b;
const f51 = a ? a ? async() : T => b : async (): T => b;
const f52 = a ? async (): T => async() : (d): number => d;
const f53 = a ? a ? async (): T => async() : d => d : b;
const f54 = a ? async (): T => a ? async() : b : d => d;
const f55 = a ? a ? async() : d => d : a ? async() : d => d;
const f56 = a ? a ? a ? async() : d => d : b : b;

const f57 = a ? d => a ? (0) : a ? async(b) : async() : (d => d = a);
const f58 = a ? d => d = async () => async() : (d => d = 0);

// @filename: b.ts
const f59 = a ? async(...c: number[]): Promise<number> => 0;
const f60 = a ? async (): Promise<number> {} : d => d;
const f61 = a ? (c): number {} : d => d;

const f62 = a ? async() : T => async(a ? b);

// @filename: c.ts
export {};
declare const a: any, b: any, c: any[];
declare function async(...a: any[]): any;
type T = Promise<any>;
let d: any;
const f63 = a ? d = (d): T => a ? 0 : async(...c) : T => b;
const f64 = a ? async (): T => async (): T => (d): T => b : a ? d => (d): T => async(...c) : T => b;
const f65 = a ? async (): T => (d): T => async() : b;
const f66 = (a ? async (): T => (d): T => async() : b);
const f67 = a ? d = (d): T => a ? 0 : async(...c) : T => a ? d = (d): T => a ? 0 : async(...c) : T => b;
const f68 = a ? async (c = a ? async() : d => d): T => async() : b;
const f69 = a ? a ? (d): T => a ? async() : b : d => d : b;
const f70 = a ? async() : (d => d);
const f71 = a ? async() : d => (a ? async() : d => d);

type x = T;
declare const x: any;
const f72 = a ? a ? async (): T => (x): T => async() : x => x;
const f73 = a ? a ? async (): Promise<any> => (x): T => async() : x => x;
const f74 = a ? async (x): T => async (): T => b;
const f75 = a ? async (x): T => async() : x => x;
