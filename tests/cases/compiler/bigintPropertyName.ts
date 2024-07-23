// @target: esnext

// @fileName: a.ts
// BigInt cannot be used as an object literal property
{ ({1n: 123}); };

const bigNum: bigint = 0n;
const a = { 1n: 123 };
const b = { [1n]: 456 };
const c = { [bigNum]: 789 };

const arr = [1, 2, 3] as const;
const { 0: d } = arr;
const { "0": e } = arr;
const { 0n: f } = arr; // bigint should give an index error

// BigInt cannot be used as an property name
const x = { 0n: 123 };

// @filename: g.ts
interface G {
    2n: string;
}
interface H {
    "3n": string;
}
class K {
    4n = 0;
}
 
class L {
    "5n" = 0;
}

const g : G = { 2n: "propertyNameError2" };
const g2 : G = { "2n": "ok2" };
g[2n];
g2[2n];

const h : H = { 3n: "propertyNameErrorAndMissingProperty3" };
const h2 : H = { "3n": "ok3" };
h[3n];
h2[3n];

const k : K = { 4n: "propertyNameError4" };
const k2 : K = { "4n": "ok4" };
k[4n];
k2[4n];

const l : L = { 5n: "propertyNameErrorAndMissingProperty5" };
const l2 : L = { "5n": "ok4" };
l[5n];
l2[5n];

g.2n; // not valid JS

// @filename: q.ts
type Q = 6n | 7n | 8n;
type T = { [t in  Q]: string };
