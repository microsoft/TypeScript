// @strict: true
declare let indexed1: { [n: string]: number; a: number; };
declare let indexed2: { [n: string]: boolean; c: boolean; };
declare let indexed3: { [n: string]: number };
declare let indexed4: { [n: number]: number };
let i = { ...indexed1, b: 11 };
// only indexed has indexer, so i[101]: any
i[101];
let ii = { ...indexed1, ...indexed2 };
// both have indexer, so i[1001]: number | boolean
ii[1001];

declare const b: boolean;
indexed3 = { ...b ? indexed3 : undefined };

declare var roindex: { readonly [x:string]: number };
var writable = { ...roindex };
writable.a = 0;  // should be ok.

var mixed = { foo: true, ...indexed3, bar: 'bar' };
mixed.foo; // boolean
mixed.bar; // string
mixed.baz; // string | number | boolean

var mixed2 = { foo: true, ...indexed4, bar: 'bar' };
mixed2.foo; // boolean
mixed2.bar; // string
mixed2[1]; // number

var mixed3 = { ...indexed4, '1': 'foo'};
mixed3[0]; // string | number
mixed3[1]; // string

var mixed4 = { ...indexed3, '1': 'foo'};
mixed4.foo; // string | number
mixed4[1]; // string