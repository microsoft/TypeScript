// @strict: true
// @declaration: true

type T00 = [string?];
type T01 = [string, string?];
type T02 = [string?, string];  // Error
type T03 = [...string[]];
type T04 = [...[...string[]]];
type T05 = [...[...[...string[]]]];
type T06 = [string, ...string[]];
type T07 = [...string[], string];  // Error
type T08 = [...string];  // Error
type T09 = [...string?];  // Error
type T10 = [string, ...[...string[]]];
type T11 = [string, ...[...[...string[]]]];

type T15 = [boolean, number, ...string[]];
type L15 = T15["length"];  // number

declare function assign<T, S extends T>(): void;

assign<number[], [...number[]]>();
assign<number[], [number, ...number[]]>();
assign<[...number[]], number[]>();

assign<[number, ...number[]], number[]>();  // Error
assign<[number, ...number[]], []>();  // Error
assign<[number, ...number[]], [number]>();
assign<[number, ...number[]], [number, number]>();
assign<[number, ...number[]], [number, number, ...number[]]>();

assign<[number], [...number[]]>();  // Error
assign<[number], [number, ...number[]]>();  // Error

assign<[number, ...number[]], [number, ...string[]]>();  // Error
assign<[number, ...number[]], [string, ...number[]]>();  // Error
assign<[number, ...number[]], [number, number, string]>();  // Error
assign<[number, ...number[]], [number, number, number, string]>();  // Error

type T20 = [number, string, ...boolean[]];

type T21 = T20[0];
type T22 = T20[0 | 1];
type T23 = T20[0 | 1 | 2];
type T24 = T20[0 | 1 | 2 | 3];
type T25 = T20[1 | 2 | 3];
type T26 = T20[2 | 3];
type T27 = T20[3];
type T28 = T20[number];

declare const t: T20;
declare const x: number;

let e0 = t[0];  // number
let e1 = t[1];  // string
let e2 = t[2];  // boolean
let e3 = t[3];  // boolean
let ex = t[x];  // number | string | boolean

declare function f0<T, U>(x: [T, ...U[]]): [T, U];

f0([]);  // Error
f0([1]);
f0([1, 2, 3]);
f0([1, "hello", true]);

declare function f1(a: [(x: number) => number, ...((x: string) => number)[]]): void;
declare function f2(...a: [(x: number) => number, ...((x: string) => number)[]]): void;

f1([x => x * 2, x => x.length, x => x.charCodeAt(0)]);
f2(x => x * 2, x => x.length, x => x.charCodeAt(0));
