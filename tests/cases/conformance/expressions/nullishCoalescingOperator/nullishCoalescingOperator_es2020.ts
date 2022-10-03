// @strict: true
// @target: es2020

declare const a1: 'literal' | undefined | null
declare const a2: '' | undefined | null
declare const a3: 1 | undefined | null
declare const a4: 0 | undefined | null
declare const a5: true | undefined | null
declare const a6: false | undefined | null
declare const a7: unknown | null
declare const a8: never | null
declare const a9: any | null


const aa1 = a1 ?? 'whatever'
const aa2 = a2 ?? 'whatever'
const aa3 = a3 ?? 'whatever'
const aa4 = a4 ?? 'whatever'
const aa5 = a5 ?? 'whatever'
const aa6 = a6 ?? 'whatever'
const aa7 = a7 ?? 'whatever'
const aa8 = a8 ?? 'whatever'
const aa9 = a9 ?? 'whatever'


declare let a: any, b: any, c: any;

let x1 = (a ?? b as any) || c;
let x2 = c || (a ?? b as any);
let x3 = ((a ?? b) as any) || c;
let x4 = c || ((a ?? b) as any);
let x5 = (a ?? b) as any || c;
let x6 = c || (a ?? b) as any;

let y1 = (a ?? b as any) && c;
let y2 = c && (a ?? b as any);
let y3 = ((a ?? b) as any) && c;
let y4 = c && ((a ?? b) as any);
let y5 = (a ?? b) as any && c;
let y6 = c && (a ?? b) as any;
