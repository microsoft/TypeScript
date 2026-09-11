// @target: esnext
// @allowJs: true
// @outDir: ./out
// @filename: a.ts
declare const a: boolean;
declare function async(...args: any[]): number;

const c1 = a ? async() : 0;
const c2 = a ? async() : (x: number) => x;
const c3 = a ? async(1) : 0;
const c4 = a ? async() : a ? async() : 0;

const f1 = async(): Promise<number> => 1;
const f2 = async (): Promise<number> => 1;
const f3 = a ? async(): Promise<number> => 1 : 2;
const f4 = a ? async () => 1 : 2;
const f5 = a ? 1 : async(): Promise<number> => 1;

export {};

// @filename: b.js
const t = true;
function async() { return 1; }
const j1 = t ? async() : 0;
const j2 = t ? async() : x => x;

export {};
